#!/usr/bin/python2

import cv2
import os.path

cascades_path = "/home/andriy/persony/mordovorot/"

def detect_faces(img, min_face_rect):
    """
    Detects all faces on the image img which size is greater than 
    min_face_rect. Returns a list of faces rectangles, each rectangle 
    as a numpy array [x1, y1, x2, y2].
    """

    global cascades_path

    cascades = ["haarcascade_frontalface_alt.xml",
                "haarcascade_profileface_alt.xml"]

    rects = []
    for c in cascades:
        cascade = cv2.CascadeClassifier(cascades_path + c)
        rs = cascade.detectMultiScale(img, 1.05, 4, 
                                     cv2.cv.CV_HAAR_SCALE_IMAGE, 
                                     min_face_rect)
        if len(rs):
            for r in rs:
                (x1, y1) = r[:2]
                r[2:] += (x1, y1) # (x2, y2) = (w + x1, h + y1)
                rects.append(r)

    return rects


def detect_face(img):
    """
    Detects a face on a picture img containing one face, which covers at 
    least approximately 1/16 of the image. Returns the resulting rectangle,
    in form of numpy array [x1, y1, x2, y2].
    """

    min_dim = min(img.shape[:2])
    rects = detect_faces(img, (min_dim/4, min_dim/4))

    if not rects:
        return None

    return rects[0]


def face_square_grudgy(img, (x1, y1, x2, y2)):
    """
    Basing on detected face recatngle face_rect, swallows maximum square space
    around it in image img. Returns the resulting rectangle. 

    Useful when one needs to squarify a photo containing mostly face.
    """
    img_h, img_w = img.shape[:2]

    dist_to_border = min(x1, y1, img_w - x2, img_h - y2)

    return (x1 - dist_to_border, y1 - dist_to_border,
            x2 + dist_to_border, y2 + dist_to_border) 


def crop(img,  (x1, y1, x2, y2)):
    return img[y1:y2, x1:x2]


if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        sys.exit("A script to make a square picture of a face. Takes an image "
                 "file name as a parameter and inputs the result "
                 "into the file with .squared extension before the original one"
                 "\n"
                 "Usage: " + sys.argv[0] + " path/to/picture")

    path = sys.argv[1]
    img = cv2.imread(path)

    face_rect = detect_face(img)
    if face_rect is None:
        sys.exit("No faces on image from " + sys.argv[1])
    else:
        face_rect = face_square_grudgy(img, face_rect)

        # Crop a face only if, simultaneously, original image is not a square 
        # and a face is not that big on the image
        img_h, img_w = img.shape[:2]
        face_w, face_h = face_rect[2]-face_rect[0], face_rect[3]-face_rect[1] 
        if img_w != img_h or face_w*face_h < .6*img_w*img_h:
            face = crop(img, face_rect)
        else:
            face = img

        writeto = (os.path.splitext(path)[0] + ".squared" 
                   + os.path.splitext(path)[1])
        cv2.imwrite(writeto, face)
