const FADE_IN_INTERVAL = 45
const FADE_OUT_INTERVAL = 10

class Reaction {
  constructor(key, url) {
    this.key = key
    this.url = url
    this.show = false
    this.opacity = 0
    this.img = null
  }
  preload() {
    this.img = loadImage(this.url)
  }
  setup() {
    this.img.resize(width / 3, 0)
  }
  render(label) {
    if (this.key == label) {
      // I SEE THE REACTION ON THE VIDEO!
      this.opacity += FADE_IN_INTERVAL
      if (this.opacity >= 255) {
        this.opacity = 255
        this.show = true
      }
    } else {
      // I DON'T SEE THE REACTION ON THE VIDEO!
      this.opacity -= FADE_OUT_INTERVAL
      if (this.opacity <= 0) {
        this.opacity = 0
        this.show = false
      }
    }

    if (this.img != null && this.show) {
      tint(255, this.opacity)
      image(this.img, 0, 0)
    }
  }
}
