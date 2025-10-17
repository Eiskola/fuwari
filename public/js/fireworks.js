// 本文件用于实现鼠标点击烟花效果
class Circle {
  constructor({ origin, speed, color, angle, context }) {
    this.origin = origin
    this.position = { ...this.origin }
    this.color = color
    this.speed = speed
    this.angle = angle
    this.context = context
    this.renderCount = 0
    this.opacity = 1 // 添加不透明度属性
  }

  draw() {
    this.context.fillStyle = `${this.color}${Math.floor(this.opacity * 255).toString(16).padStart(2, '0')}`
    this.context.beginPath()
    this.context.arc(this.position.x, this.position.y, 4, 0, Math.PI * 2)
    this.context.fill()
  }

  move() {
    this.position.x = (Math.sin(this.angle) * this.speed) + this.position.x
    this.position.y = (Math.cos(this.angle) * this.speed) + this.position.y + (this.renderCount * 0.3)
    this.renderCount++
    this.opacity -= 0.02 // 逐渐降低不透明度，使效果自然消失
  }
}

class Boom {
  constructor({ origin, context, circleCount = 16, area }) {
    this.origin = origin
    this.context = context
    this.circleCount = circleCount
    this.area = area
    this.stop = false
    this.circles = []
    this.life = 60 // 爆炸效果的生命周期
  }

  randomArray(range) {
    const length = range.length
    const randomIndex = Math.floor(length * Math.random())
    return range[randomIndex]
  }

  randomColor() {
    const range = ['FF5733', 'FFC300', 'DAF7A6', 'C70039', '900C3F', '581845', '00FFFF', 'FF00FF', 'FFFF00']
    return '#' + this.randomArray(range)
  }

  randomRange(start, end) {
    return (end - start) * Math.random() + start
  }

  init() {
    for (let i = 0; i < this.circleCount; i++) {
      const circle = new Circle({
        context: this.context,
        origin: this.origin,
        color: this.randomColor(),
        angle: this.randomRange(0, Math.PI * 2), // 改为360度随机角度，效果更自然
        speed: this.randomRange(1, 3)
      })
      this.circles.push(circle)
    }
  }

  move() {
    this.life--
    if (this.life <= 0) {
      this.circles = []
      this.stop = true
      return
    }
    
    this.circles.forEach((circle, index) => {
      // 检查是否超出画布范围或完全透明
      if (circle.position.x < 0 || circle.position.x > this.area.width || 
          circle.position.y < 0 || circle.position.y > this.area.height ||
          circle.opacity <= 0) {
        return this.circles.splice(index, 1)
      }
      circle.move()
    })
    
    if (this.circles.length === 0) {
      this.stop = true
    }
  }

  draw() {
    this.circles.forEach(circle => circle.draw())
  }
}

class CursorSpecialEffects {
  constructor() {
    this.computerCanvas = document.createElement('canvas')
    this.renderCanvas = document.createElement('canvas')

    this.computerContext = this.computerCanvas.getContext('2d')
    this.renderContext = this.renderCanvas.getContext('2d')

    this.globalWidth = window.innerWidth
    this.globalHeight = window.innerHeight

    this.booms = []
    this.running = false
    this.animationId = null // 保存动画帧ID
    
    // 绑定事件处理函数的this上下文
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handlePageHide = this.handlePageHide.bind(this)
    this.handleBeforeUnload = this.handleBeforeUnload.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.run = this.run.bind(this)
  }

  handleMouseDown(e) {
    // 检查是否是点击链接或按钮导致的跳转
    const isNavigation = e.target.closest('a, button, [onclick]') !== null;
    
    const boom = new Boom({
      origin: { x: e.clientX, y: e.clientY },
      context: this.computerContext,
      area: {
        width: this.globalWidth,
        height: this.globalHeight
      }
    })
    boom.init()
    this.booms.push(boom)
    
    // 如果是导航点击，设置这个爆炸效果的生命周期短一些
    if (isNavigation) {
      boom.life = 20;
    }
    
    this.running || this.run()
  }

  // 清理所有效果和事件监听
  cleanup() {
    // 停止动画循环
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
    
    // 清空爆炸效果数组
    this.booms = []
    this.running = false
    
    // 清空画布
    this.computerContext.clearRect(0, 0, this.globalWidth, this.globalHeight)
    this.renderContext.clearRect(0, 0, this.globalWidth, this.globalHeight)
  }

  handlePageHide() {
    this.cleanup()
  }

  handleBeforeUnload() {
    this.cleanup()
  }

  // 处理窗口大小变化
  handleResize() {
    this.globalWidth = window.innerWidth
    this.globalHeight = window.innerHeight
    
    this.renderCanvas.width = this.computerCanvas.width = this.globalWidth
    this.renderCanvas.height = this.computerCanvas.height = this.globalHeight
  }

  init() {
    const style = this.renderCanvas.style
    style.position = 'fixed'
    style.top = style.left = 0
    style.zIndex = '999999999'
    style.pointerEvents = 'none'

    style.width = this.renderCanvas.width = this.computerCanvas.width = this.globalWidth
    style.height = this.renderCanvas.height = this.computerCanvas.height = this.globalHeight

    document.body.append(this.renderCanvas)

    // 添加事件监听
    window.addEventListener('mousedown', this.handleMouseDown)
    window.addEventListener('pagehide', this.handlePageHide)
    window.addEventListener('beforeunload', this.handleBeforeUnload)
    window.addEventListener('resize', this.handleResize)
  }

  run() {
    this.running = true
    
    // 如果没有爆炸效果，停止动画
    if (this.booms.length === 0) {
      this.running = false
      return
    }

    // 保存动画帧ID以便后续可以取消
    this.animationId = requestAnimationFrame(this.run)

    // 清空画布
    this.computerContext.clearRect(0, 0, this.globalWidth, this.globalHeight)
    this.renderContext.clearRect(0, 0, this.globalWidth, this.globalHeight)

    // 更新和绘制所有爆炸效果
    this.booms.forEach((boom, index) => {
      if (boom.stop) {
        this.booms.splice(index, 1)
      } else {
        boom.move()
        boom.draw()
      }
    })
    
    // 绘制到渲染画布
    this.renderContext.drawImage(this.computerCanvas, 0, 0, this.globalWidth, this.globalHeight)
  }
}


// 初始化鼠标特效
(function cursorFireworksCusor() {
  // 确保DOM加载完成后再初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const cursorSpecialEffects = new CursorSpecialEffects()
      cursorSpecialEffects.init()
    })
  } else {
    const cursorSpecialEffects = new CursorSpecialEffects()
    cursorSpecialEffects.init()
  }
})();