//VERSION=3
//True Colour Marine – High Glint
function setup() {
  return {
    input: ["B08","B04","B03","B02", "dataMask"],
    output: { bands: 4 }
  };
}

function evaluatePixel(sample) {
  g = 1
  s2 = sample.B02
  s3 = sample.B03
  s4 = sample.B04
  sg = sample.B08 // just use B08 for maximum sun glint correction 
  image = "raw"
  switch(image) {
    case "sg":
      b2 = Math.pow(5 * (s2 - (sg*0.8)-0.02),g)
      b3 = Math.pow(5 * (s3 - (sg*0.9)),g)
      b4 = Math.pow(5 * (s4 - (sg*1.0)),g)
      break;
    case "raw":
      b2 = Math.pow(5 * ((s2)-0.06/0.8-0.02),g)
      b3 = Math.pow(5 * ((s3)-0.06/0.9),g)
      b4 = Math.pow(5 * ((s4)-0.06/1.0),g)
      break;
    case "b8":
      b8 = sg*5*0.9-0.2
      b2 = b8
      b3 = b8
      b4 = b8
  }
  return [b4, b3, b2, sample.dataMask];
}