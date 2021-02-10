// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.

let param = args.widgetParameter
const apiData = await getApiData()

// Change Frame Size small large medium
const widgetSize = (config.widgetFamily ? 
config.widgetFamily : 'small')
// config.widgetFamily : 'large')
// config.widgetFamily : '')
const widget = await createWidget()

// For debug delete "!" from !config.runInWidget
if (!config.runInWidget) {
 switch(widgetSize) {
   case 'small':
   await widget.presentSmall()
   break;

   case 'large':
   await widget.presentLarge()
   break;

   default: // medium
   await widget.presentMedium()
 }
}
Script.setWidget(widget)
Script.complete()

//------------------------------------------------
// build the content of the widget
async function createWidget() {

 const list = new ListWidget()

 let row1 = list.addStack()
 row1.layoutHorizontally()

 let column1 = row1.addStack()
 column1.layoutVertically()

 let column2 = row1.addStack()
 column2.layoutVertically()

 const logoImg = await getImage('chuck.png')
 if (widgetSize != 'small') {
   list.setPadding(5, 20, 0, 0)
 }else {
   list.setPadding(5, 5, 5, 0)
 }

 const logoStack = column2.addStack()
 if (widgetSize != 'small') {
   logoStack.addSpacer(110)
 }else {
   logoStack.addSpacer(25)
 }

 const logoImageStack = logoStack.addStack()
 logoStack.layoutHorizontally()
 logoImageStack.backgroundColor = new Color("#ffffff", 1.0)
 logoImageStack.cornerRadius = 8

 const img = logoImageStack.addImage(logoImg)
 if (widgetSize != 'small') {
   img.imageSize = new Size(50, 50)
 }else {
   img.imageSize = new Size(35, 35)
 }

 const paperText = column1.addText("chucknorris.io")  
 if (widgetSize != 'small') {
   paperText.font = Font.mediumRoundedSystemFont(20)
   paperText.textColor = new Color("#FF8000", 1.0)  
   list.addSpacer(4)
 }else {
   paperText.font = Font.mediumRoundedSystemFont(12)
 paperText.textColor = new Color("#FF8000", 1.0)
 }

 const newText = list.addText(apiData.value)
 if (widgetSize != 'small') {
   newText.font = Font.mediumRoundedSystemFont(14)
 }else {
   newText.font = Font.mediumRoundedSystemFont(10)
 }

 return list
}

//------------------------------------------------
// url get api data
async function getApiData() {
 let url = "https://api.chucknorris.io/jokes/random"
 let req = new Request(url)
 let apiResult = await req.loadJSON()

 return apiResult
}

//------------------------------------------------
// get images from local filestore or download them once
async function getImage(image) {
 let fm = FileManager.local()
 let dir = fm.documentsDirectory()
 let path = fm.joinPath(dir, image)
 if (fm.fileExists(path)) {
   return fm.readImage(path)
 }else{
   // download once
   let imageUrl
   switch (image) {
     case 'chuck.png':
       imageUrl = "https://assets.chucknorris.host/img/avatar/chuck-norris.png"
       break
     default:
       console.log(`Sorry, no ${image}.`);
   }
   let iconImage = await loadImage(imageUrl)
   fm.writeImage(path, iconImage)

   return iconImage
 }
}

//------------------------------------------------
// helper function to download an image from a given url
async function loadImage(imgUrl) {
  const req = new Request(imgUrl)
  
  return await req.loadImage()
}

// end of script copy until here :)
