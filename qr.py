import qrcode
imei = '0868755123661050'
img = qrcode.make('https://iqw3pm3mgm.ap-southeast-2.awsapprunner.com/#0868755123661050')
img.save(imei+".png")