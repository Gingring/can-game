class main{
    constructor() {
        this.canvas = document.createElement("canvas")
        this.c = this.canvas.getContext("2d")

    }
    setup() {
        document.body.style.margin = 0
        this.canvas.style.backgroundColor = "black"
        this.canvas.width = innerWidth
        this.canvas.height = innerHeight
        this.canvas.style.position = "absolute"
        document.body.appendChild(this.canvas)
    }
    smoothEffect(power, size = new vector(10, 10)) {
        this.c.fillStyle = `rgba(0,0,0,${power})`
        this.c.fillRect(0, 0, size.x, size.y)
    }
    touchesPos(ev, touchNumber) {
        const pos = new vector(ev.touches[touchNumber].clientX, ev.touches[touchNumber].clientY)
        return pos
    }
    createButton(text = "",id = ""){
        const button = document.createElement("button")
        button.innerText = text
        button.id = id
        button.style.position = "absolute"
        button.style.zIndex = "2"
        document.body.appendChild(button)
    }

}
class vector {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }
    add(value = new vector(1, 1)) {
        this.x += value.x
        this.y += value.y
    }
    subt(value = new vector(1, 1)) {
        this.x -= value.x
        this.y -= value.y
    }
    mult(value = new vector(1, 1)) {
        this.x *= value.x
        this.y *= value.y
    }
    divi(value = new vector(1, 1)) {
        this.x /= value.x
        this.y /= value.y
    }
    static zero() {
        this.x = 0
        this.y = 0
    }
    one() {
        this.x = 1
        this.y = 1
    }
    norm() {
        if (this.x < 0)
            this.x /= (this.x * -1)
        else if (this.x > 0)
            this.x /= this.x
        if (this.y < -0)
            this.y /= (this.y * -1)
        else if (this.y > 0)
            this.y /= this.y
    }
    equal(x, y) {
        this.x = x
        this.y = y
    }
    lockAt(x, y, speed = new vector(1, 1)) {
        const angle = Math.atan2(y - this.y, x - this.x)
        this.x += Math.cos(angle) * speed.x
        this.y += Math.sin(angle) * speed.y
    }
}
class drawRect {
    constructor(canvas = document.createElement("canvas"),
        pos = new vector(0, 0),
        size = new vector(10, 10),
        color = 'white',
        fill = true,
        line = true,
        lineColor = 'white',
        lineWidth = 1,
        rotation = 0) {
        this.canvas = canvas
        this.c = this.canvas.getContext("2d")
        this.pos = pos
        this.size = size
        this.color = color
        this.fill = fill
        this.line = line
        this.lineColor = lineColor
        this.lineWidth = lineWidth

    }
    draw() {
        //fill border
        this.c.beginPath()
        this.c.rect(this.pos.x, this.pos.y, this.size.x, this.size.y)
        //fill rect
        if (this.fill) {
            this.c.fillStyle = this.color
            this.c.fill()
        }
        if (this.line) {
            this.c.strokeStyle = this.lineColor
            this.c.lineWidth = this.lineWidth
            this.c.stroke()
        }
    }

}
class drawLine {
    constructor(canvas = document.createElement("canvas"),
        posFrom = new vector(0, 0),
        posTo = new vector(10, 0),
        size = 10,
        color,
        lineWidth,
        lineStyle) {
        this.canvas = canvas
        this.c = this.canvas.getContext("2d")
        this.posFrom = posFrom
        this.posTo = posTo
        this.color = color
        this.lineStyle = lineStyle
        this.lineWidth = lineWidth


    }
    draw() {
        this.c.beginPath()
        if (this.lineStyle == 'smooth') {
            this.lineStyle = 'round'
        } else if (this.linestyle == 'square') {
            this.lineStyle = 'square'
        } else {
            this.lineStyle = 'butt'
        }
        this.c.lineCap = this.linetyle
        this.c.strokeStyle = this.color
        this.c.lineWidth = this.width
        this.c.moveTo(this.posFrom.x, this.posFrom.y)
        this.c.lineTo(this.posTo.x, this.posTo.y)
        this.c.stroke()
    }
}
class drawCircle {
    constructor(canvas = document.createElement("canvas"),
        pos = new vector(0, 0),
        size = 2,
        color = 'white',
        fill = true,
        line,
        lineColor,
        lineWidth) {
        this.canvas = canvas
        this.c = this.canvas.getContext("2d")
        this.pos = pos
        this.size = size
        this.color = color
        this.fill = fill
        this.line = line
        this.lineColor = lineColor
        this.lineWidth = lineWidth

    }
    draw() {
        this.c.beginPath()
        if (this.fill) {
            this.c.fillStyle = this.color
            this.c.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2, false)
            this.c.fill()
        }
        if (this.line) {
            this.c.strokeStyle = this.lineColor
            this.c.lineWidth = this.lineWidth
            this.c.stroke()
        }
    }
}
class drawImg {
    constructor(canvas, pos = new vector(0, 0), size = new vector(1, 1), url) {
        this.url = url
        this.canvas = canvas
        this.c = this.canvas.getContext("2d")
        this.pos = pos
        this.size = size
        this.image = new Image()
        this.image.src = this.url
    }
    draw() {
        this.c.drawImage(this.image, this.pos.x, this.pos.y, this.size.x, this.size.y)
    }
}
class collide {
    static boxWithCircle(c, b) {
        const line = new drawLine(c.canvas,
            c.pos,
            new vector(
                math.clamp(c.pos.x, b.pos.x, b.pos.x + b.size.x),
                math.clamp(c.pos.y, b.pos.y, b.pos.y + b.size.y)), "blue", 40,
            "smooth")
        const point = new drawRect(c.canvas, new vector(line.posTo.x + c.size, line.posTo.y + c.size), new vector(10, 10), "red", true, false, "blue", 10)
        if (point.pos.x >= c.pos.x && point.pos.y >= c.pos.y && c.pos.x > b.pos.x && c.pos.y > b.pos.y) {
            return true
        } else if (point.pos.x >= c.pos.x && point.pos.y >= c.pos.y && c.pos.x > b.pos.x - c.size && c.pos.y > b.pos.y - c.size) {
            return true
        }
    }
    static boxes(r1, r2) {
        const line = new drawLine(r1.canvas,
            r1.pos,
            new vector(
                math.clamp(r1.pos.x, r2.pos.x, r2.pos.x + r2.size.x),
                math.clamp(r1.pos.y, r2.pos.y, r2.pos.y + r2.size.y)), 1, 'blue', 40,
            "smooth")
        const point = new drawRect(r1.canvas, new vector(line.posTo.x, line.posTo.y), new vector(10, 10), "red", true, false, "blue", 10)
        if (point.pos.x >= r1.pos.x && point.pos.y >= r1.pos.y && r1.pos.x > r2.pos.x && r1.pos.y > r2.pos.y) {
            return true
        } else if (point.pos.x >= r1.pos.x && point.pos.y >= r1.pos.y && r1.pos.x > r2.pos.x - r1.size.x && r1.pos.y > r2.pos.y - r1.size.x) {
            return true
        }
    }
    static circles(c1, c2) {
        const dist = Math.hypot(c1.pos.x - c2.pos.x, c1.pos.y - c2.pos.y)
        if (dist - c2.size - c1.size < 1) {
            return true
        }
    }
}
class particles {
    constructor(canvas = document.createElement("canvas"), pos = new vector(0, 0), size = new vector(0, 0), color, fill, number, speed = new vector(),timer, line, lineColor, lineWidth) {
        this.canvas = canvas
        this.pos = pos
        this.size = size
        this.color = color
        this.fill = fill
        this.line = line
        this.lineColor = lineColor
        this.lineWidth = lineWidth
        this.speed = speed
        this.speedX = (Math.random() - 0.5) * (Math.random() * this.speed.x)
        this.speedY = (Math.random() - 0.5) * (Math.random() * this.speed.x)
        
        this.timer = 0
        this.maxTime = timer
    }
    draw() {
        this.timer+=0.1
        if(this.timer < this.maxTime){
        this.particles = new drawRect(this.canvas, this.pos, this.size, this.color, this.fill, this.line, this.lineColor, this.lineWidth)
        this.particles.pos.x += this.speedX
        this.particles.pos.y += this.speedY
        this.particles.draw()
        }
    }
}
class math {
    static clamp(value, min, max) {
        if (value > max) {
            return max
        }
        else if (value < min) {
            return min
        }
        else {
            return value
        }
    }
}
export { main, vector, drawRect, drawLine, drawCircle, drawImg, collide, math, particles }