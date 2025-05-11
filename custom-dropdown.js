// 创建自定义下拉框组件
document.addEventListener("DOMContentLoaded", () => {
  // 初始化已存在的下拉框
  initializeAllDropdowns()

  // 设置MutationObserver监听DOM变化，自动处理新添加的下拉框
  setupMutationObserver()
})

// 初始化所有下拉框
function initializeAllDropdowns() {
  // 查找所有需要转换为自定义下拉框的select元素
  const selects = document.querySelectorAll(".language-selector, .search-column, .form-field select")

  selects.forEach((select) => {
    // 检查是否已经被转换
    if (!select.dataset.customized) {
      createCustomDropdown(select)
    }
  })

  // 关闭所有打开的下拉框（点击页面其他区域时）
  document.addEventListener("click", (e) => {
    const customDropdowns = document.querySelectorAll(".custom-dropdown-container")
    customDropdowns.forEach((dropdown) => {
      if (!dropdown.contains(e.target)) {
        dropdown.querySelector(".custom-dropdown-options").classList.remove("show")
      }
    })
  })
}

// 设置MutationObserver监听DOM变化
function setupMutationObserver() {
  // 创建一个观察器实例
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      // 检查是否有新节点添加
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node) => {
          // 检查添加的节点是否是元素节点
          if (node.nodeType === Node.ELEMENT_NODE) {
            // 检查节点本身是否是select
            if (
              node.matches &&
              node.matches(".language-selector, .search-column, .form-field select") &&
              !node.dataset.customized
            ) {
              createCustomDropdown(node)
            }

            // 检查节点内部是否有select
            const selects = node.querySelectorAll
              ? node.querySelectorAll(".language-selector, .search-column, .form-field select")
              : []
            selects.forEach((select) => {
              if (!select.dataset.customized) {
                createCustomDropdown(select)
              }
            })
          }
        })
      }
    })
  })

  // 配置观察选项
  const config = {
    childList: true, // 观察直接子节点的变动
    subtree: true, // 观察所有后代节点的变动
    attributes: false,
    characterData: false,
  }

  // 开始观察document.body的变化
  observer.observe(document.body, config)
}

// 创建自定义下拉框
function createCustomDropdown(selectElement) {
  // 标记该select已被自定义处理
  selectElement.dataset.customized = "true"

  // 创建自定义下拉框容器
  const dropdownContainer = document.createElement("div")
  dropdownContainer.className = "custom-dropdown-container"
  dropdownContainer.style.width = getComputedStyle(selectElement).width

  // 创建选中项显示区域
  const selectedOption = document.createElement("div")
  selectedOption.className = "custom-dropdown-selected"
  selectedOption.textContent = selectElement.options[selectElement.selectedIndex]?.text || "请选择"

  // 添加下拉箭头
  const arrow = document.createElement("span")
  arrow.className = "custom-dropdown-arrow"
  selectedOption.appendChild(arrow)

  // 创建选项列表
  const optionsList = document.createElement("div")
  optionsList.className = "custom-dropdown-options"

  // 添加选项
  Array.from(selectElement.options).forEach((option, index) => {
    const optionElement = document.createElement("div")
    optionElement.className = "custom-dropdown-option"
    optionElement.textContent = option.text
    optionElement.dataset.value = option.value

    if (index === selectElement.selectedIndex) {
      optionElement.classList.add("selected")
    }

    optionElement.addEventListener("click", () => {
      // 更新原始select的值
      selectElement.value = option.value

      // 触发change事件
      const event = new Event("change", { bubbles: true })
      selectElement.dispatchEvent(event)

      // 更新显示的选中项
      selectedOption.textContent = option.text
      selectedOption.appendChild(arrow)

      // 更新选中状态
      optionsList.querySelectorAll(".custom-dropdown-option").forEach((opt) => {
        opt.classList.remove("selected")
      })
      optionElement.classList.add("selected")

      // 隐藏选项列表
      optionsList.classList.remove("show")
    })

    optionsList.appendChild(optionElement)
  })

  // 点击选中项时显示/隐藏选项列表
  selectedOption.addEventListener("click", (e) => {
    e.stopPropagation()
    optionsList.classList.toggle("show")
  })

  // 组装下拉框
  dropdownContainer.appendChild(selectedOption)
  dropdownContainer.appendChild(optionsList)

  // 隐藏原始select
  selectElement.style.display = "none"

  // 将自定义下拉框插入到原始select后面
  selectElement.parentNode.insertBefore(dropdownContainer, selectElement.nextSibling)

  // 监听原始select的变化
  selectElement.addEventListener("change", () => {
    if (selectElement.selectedIndex >= 0) {
      selectedOption.textContent = selectElement.options[selectElement.selectedIndex].text
      selectedOption.appendChild(arrow)

      optionsList.querySelectorAll(".custom-dropdown-option").forEach((opt, index) => {
        if (index === selectElement.selectedIndex) {
          opt.classList.add("selected")
        } else {
          opt.classList.remove("selected")
        }
      })
    }
  })
}

// 将函数暴露为全局函数，以便可以手动调用
window.createCustomDropdown = createCustomDropdown
window.initializeAllDropdowns = initializeAllDropdowns
