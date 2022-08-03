from PIL import Image

img1 = Image.open("./img1.gif")
img2 = Image.open("./img2.jpg")
img3 = Image.open("./img3.jpg")
img4 = Image.open("./img4.jpg")

#img1 = img1.resize((300,400))
#img2 = img2.resize((300,400))
#img3 = img3.resize((300,400))
#img4 = img4.resize((300,400))

img_size = [2700,1700]

new_img = Image.new("RGB", (6000, 4000), (255,255,255))
new_img.paste(img1, (200,100))
new_img.paste(img2, (img_size[0] + 400, 100))
new_img.paste(img3, (200, img_size[1] + 200))
new_img.paste(img4, (img_size[0] + 400, img_size[1] + 200))

new_img.save("merged_img.gif","GIF")

