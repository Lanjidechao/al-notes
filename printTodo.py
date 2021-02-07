import os

dir = "C:\\Users\\xu.jiuwu\\Desktop\\halfdev\\halfdev\\SFDC\\force-app\\main\\default\\lwc\\"
fs = os.listdir(dir)
for f in os.listdir(dir):
    if os.path.isdir(os.path.join(dir, f)):
        print(f)
