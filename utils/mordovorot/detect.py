#!/usr/bin/python2

import cv2

cascades_path = "/home/andriy/maidan/persony/mordovorot/"

def detect_faces(img):
    global cascade_path

    cascades = ["haarcascade_frontalface_alt.xml", "haarcascade_profileface_alt.xml"]

    rects = []
    for c in cascades:
        cascade = cv2.CascadeClassifier(cascades_path + c)
        r = (cascade.detectMultiScale(img, 1.05, 4, cv2.cv.CV_HAAR_SCALE_IMAGE, (100,100)))
        if len(r):
            rects += r.tolist()

    return rects


def crop_face_square(img):
    rects = detect_faces(img)

    if not len(rects):
        return 

    x, y, w, h = rects[0]
    #w, h = img.shape()
    #distance_to_border = min(x1, y1, w - x2, h - y2)
    #add = distance_to_border
    return img[y:y+h, x:x+w]


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
