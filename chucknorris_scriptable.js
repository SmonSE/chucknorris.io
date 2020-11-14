// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.

let param = args.widgetParameter
if (param != null && param.length > 0) {
  storeId = param
}

const widget = new ListWidget()
const apiData = await getApiData()
await createWidget()

// used for debugging if script runs inside the app
if (!config.runsInWidget) {
  await widget.presentSmall()
}
Script.setWidget(widget)
Script.complete()

// build the content of the widget
async function createWidget() {
  widget.addSpacer(2)
  const logoImg = await getImage('chuck.png')
  widget.setPadding(0, 10, 10, 10)

  const logoStack = widget.addStack()
  logoStack.addSpacer(100)
  const logoImageStack = logoStack.addStack()
  logoStack.layoutHorizontally()
  logoImageStack.backgroundColor = new Color("#ffffff", 1.0)
  logoImageStack.cornerRadius = 8
  
  const img = logoImageStack.addImage(logoImg)
  img.imageSize = new Size(35, 35)
  img.rightAlignImage()
  widget.addSpacer(0)

  const paperText = widget.addText("chucknorris.io")
  paperText.font = Font.mediumRoundedSystemFont(15)
  paperText.textColor = new Color("#FF8000", 1.0)
  widget.addSpacer(0)
    
  const newText = widget.addText(apiData.value)
  let newTextSize = newText.length
  if (newTextSize > 100 && newTextSize < 120) {
    newText.font = Font.regularSystemFont(7)
  } else if (newTextSize > 121 && newTextSize < 140) {
    newText.font = Font.regularSystemFont(6)
  } else if (newTextSize > 141 && newTextSize < 160) {
    newText.font = Font.regularSystemFont(5)
  } else if (newTextSize > 161 && newTextSize < 200) {
    newText.font = Font.regularSystemFont(4)
  } else {
    newText.font = Font.regularSystemFont(10)
  }
}

// url get api data
async function getApiData() {
  let url = "https://api.chucknorris.io/jokes/random"
  let req = new Request(url)
  let apiResult = await req.loadJSON()
  
  return apiResult
}

// get images from local filestore or download them once
async function getImage(image) {
  let fm = FileManager.local()
  let dir = fm.documentsDirectory()
  let path = fm.joinPath(dir, image)
  if (fm.fileExists(path)) {
    return fm.readImage(path)
  } else {
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

// helper function to download an image from a given url
async function loadImage(imgUrl) {
  const req = new Request(imgUrl)
  
  return await req.loadImage()
}

// end of script copy until here :)
