import cv2, dlib, sys
import numpy as np

# initialize face detector and shape predictor
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor('shape_predictor_5_face_landmarks.dat')

# load video
cap = cv2.VideoCapture(1)
cap_width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
cap_height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)

# load overlay image
overlay = cv2.imread('samples/ssafy.png', cv2.IMREAD_UNCHANGED)

# overlay function
def overlay_transparent(background_img, img_to_overlay_t, x, y, overlay_size=None):
  bg_img = background_img.copy()
  # convert 3 channels to 4 channels
  if bg_img.shape[2] == 3:
    bg_img = cv2.cvtColor(bg_img, cv2.COLOR_BGR2BGRA)

  if overlay_size is not None:
    img_to_overlay_t = cv2.resize(img_to_overlay_t.copy(), overlay_size)

  b, g, r, a = cv2.split(img_to_overlay_t)

  mask = cv2.medianBlur(a, 5)

  h, w, _ = img_to_overlay_t.shape
  roi = bg_img[int(y-h/2):int(y+h/2), int(x-w/2):int(x+w/2)]

  img1_bg = cv2.bitwise_and(roi.copy(), roi.copy(), mask=cv2.bitwise_not(mask))
  img2_fg = cv2.bitwise_and(img_to_overlay_t, img_to_overlay_t, mask=mask)

  bg_img[int(y-h/2):int(y+h/2), int(x-w/2):int(x+w/2)] = cv2.add(img1_bg, img2_fg)

  # convert 4 channels to 4 channels
  bg_img = cv2.cvtColor(bg_img, cv2.COLOR_BGRA2BGR)

  return bg_img

while True:
  ret, img = cap.read()
  img = cv2.flip(img, 1)
  result = img.copy()

  face_sizes_width = []
  face_sizes_height = []
  center_xs = []
  center_ys = []
  halfs_width = []
  halfs_height = []

  if not ret:
    break

  faces = detector(img)
  if len(faces) == 0:
    result = img.copy()
  else:
    for face in faces:
      dlib_shape = predictor(img, face)
      shape_2d = np.array([[p.x, p.y] for p in dlib_shape.parts()])

      top_left = np.min(shape_2d, axis=0)
      bottom_right = np.max(shape_2d, axis=0)

      face_size_width = int(max(bottom_right - top_left) * 3)
      face_size_height = int(max(bottom_right - top_left) * 1.5)
      half_width = face_size_width / 2
      half_height = face_size_height / 2
      center_x, center_y = np.mean(shape_2d, axis=0).astype(np.int)

      face_sizes_width.append(face_size_width)
      face_sizes_height.append(face_size_height)
      halfs_width.append(half_width)
      halfs_height.append(half_height)
      center_xs.append(center_x)
      center_ys.append(center_y - 70)

    for i in range(len(faces)):
      if center_xs[i] - halfs_width[i] < 0 or center_ys[i] - halfs_height[i] < 0 or \
              center_xs[i] + halfs_width[i] >= cap_width or center_ys[i] + halfs_height[i] >= cap_height:
        continue
      else:
        result = overlay_transparent(result, overlay, center_xs[i], center_ys[i],
                                     overlay_size=(face_sizes_width[i],face_sizes_height[i]))

  cv2.imshow('img', result)
  cv2.waitKey(1)


# center_x, center_y, face_size 배열로 받아서 한번에 그려넣기