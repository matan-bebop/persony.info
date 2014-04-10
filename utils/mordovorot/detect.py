#!/usr/bin/python2

import cv2

cascades_path = "/home/andriy/maidan/persony/mordovorot/"

def detect_faces(img, min_face_rect):
    global cascade_path

    cascades = ["haarcascade_frontalface_alt.xml",
                "haarcascade_profileface_alt.xml"]

    rects = []
    for c in cascades:
        cascade = cv2.CascadeClassifier(cascades_path + c)
        r = (cascade.detectMultiScale(img, 1.05, 4, 
            cv2.cv.CV_HAAR_SCALE_IMAGE, min_face_rect))
        if len(r):
            rects += r.tolist()

    return rects


def crop_face_square(img):
    img_h, img_w = img.shape[:2]
    min_dim = min(img_w, img_h)

    rects = detect_faces(img, (min_dim/4, min_dim/4))

    if not len(rects):
        return 

    r = rects[0]
    x1, y1 = r[:2]
    x2, y2 = r[0]+r[2], r[1]+r[3]

    dist_to_border = min(x1, y1, img_w - x2, img_h - y2)

    print x1, y1, x2, y2
    print dist_to_border

    return img[y1-dist_to_border : y2+dist_to_border, 
               x1-dist_to_border : x2+dist_to_border]


if __name__ == "__main__":
    import sys

    def print_usage():
        print "A script to make a square picture of a face. Takes an image file name as a parameter and inputs the result into the file with preceding 'squared-'."
        print
        print "Usage: " + sys.argv[0] + " path/to/picture" 

    if len(sys.argv) < 2:
        print_usage()
    else:
        path = sys.argv[1]

        img = cv2.imread(path)
        face = crop_face_square(img)

        if face is None:
            print "No faces on image from " + sys.argv[1] 
        else:
            cv2.imwrite("squared-" + path, face)
