from picamera import PiCamera
from os import system
from time import sleep

camera = PiCamera()

camera.resolution = (640, 480)

for i in range(30):
    camera.capture('./image{0:04d}.jpg'.format(i))
    sleep(0.1)

system('convert -delay 10 -loop 0 ./image*.jpg ./animation.gif')