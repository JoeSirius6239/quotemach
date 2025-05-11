// 在文件顶部添加这个变量
let isApplicationLocked = false;

document.addEventListener("DOMContentLoaded", () => {
  // 直接在DOMContentLoaded事件中设置上传区域的点击事件
  setupFileUpload()

  // 其他初始化代码...

  // 每次刷新页面时自动清除localStorage
  console.log("正在清除本地存储...")
  localStorage.clear()

    // 密码验证功能
const setupPasswordVerification = () => {
  const splashScreen = document.querySelector(".splash-screen");
  const startBtn = document.querySelector(".start-btn");
  const passwordContainer = document.querySelector(".password-container");
  const passwordInput = document.getElementById("password-input");
  const passwordError = document.querySelector(".password-error");
  const mainContent = document.querySelector(".main-content");
  const sidebar = document.querySelector(".sidebar");
  const transitionOverlay = document.getElementById("transition-overlay");
  const hash = "admintestin"; 

  if (startBtn && passwordContainer && passwordInput) {
    // 点击开始按钮显示密码输入框
    startBtn.addEventListener("click", (e) => {
      e.preventDefault();
      startBtn.style.display = "none";
      passwordContainer.style.display = "block";
      
      // 使用setTimeout确保DOM更新后再添加show类
      setTimeout(() => {
        passwordContainer.classList.add("show");
        passwordInput.focus();
      }, 10);
    });
    
    // 监听密码输入框的回车键
    passwordInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const enteredPassword = passwordInput.value;

        // 显示验证成功动画
function showAuthSuccessAnimation() {
  const successScreen = document.getElementById('auth-success-screen');
  const successMessage = document.getElementById('auth-success-message');
  const welcomeMessage = document.getElementById('auth-success-welcome');
  
  // 显示成功屏幕
  successScreen.classList.add('show');
  
  // 延迟显示消息文本
  setTimeout(() => {
    successMessage.classList.add('show');
  }, 300);
  
  setTimeout(() => {
    welcomeMessage.classList.add('show');
  }, 500);
  
  // 动画完成后隐藏过渡屏幕并显示主界面
  setTimeout(() => {
    successScreen.classList.remove('show');
    splashScreen.classList.add("hidden");
    
    // 在过渡动画结束后执行原有的代码
    setTimeout(() => {
      
      setTimeout(() => {
        splashScreen.style.display = "none";
        if (mainContent) mainContent.style.opacity = "1";
        if (sidebar) sidebar.style.opacity = "1";

        // 只有在非锁定状态下才重置应用
        if (!isApplicationLocked) {
          // 直接调用handleReset函数但绕过确认对话框
          const originalConfirm = window.confirm;
          window.confirm = () => true; // 覆盖confirm函数，使其始终返回true
          if (FinancialClauseEngine && typeof FinancialClauseEngine.handleReset === "function") {
            FinancialClauseEngine.handleReset();
          }
          window.confirm = originalConfirm; // 恢复原始confirm函数
        } else {
          // 重置锁定标志
          isApplicationLocked = false;
        }
      }, 0);
    }, 300);
  }, 1000);
}
        
        if (enteredPassword === hash) {
          // 密码正确，隐藏启动屏幕
          passwordContainer.classList.remove("show");
          
          // 调用验证成功动画
          showAuthSuccessAnimation();
          
        } else {
          // 密码错误，显示错误信息
          passwordError.style.display = "block";
          passwordError.classList.add("show");
          passwordInput.value = "";
          
          // 输入框抖动效果
          passwordInput.classList.add("shake");
          setTimeout(() => {
            passwordInput.classList.remove("shake");
          }, 500);
          
          // 3秒后隐藏错误信息
          setTimeout(() => {
            passwordError.classList.remove("show");
            setTimeout(() => {
              passwordError.style.display = "none";
            }, 300);
          }, 3000);
        }
      }
    });
  }
  };

// 调用密码验证设置函数
  setupPasswordVerification();

// 锁定应用函数
const lockApplication = () => {
  isApplicationLocked = true;

  const splashScreen = document.querySelector(".splash-screen");
  const startBtn = document.querySelector(".start-btn");
  const passwordContainer = document.querySelector(".password-container");
  const passwordInput = document.getElementById("password-input");
  const mainContent = document.querySelector(".main-content");
  const sidebar = document.querySelector(".sidebar");


  // 重置密码输入框
  if (passwordInput) passwordInput.value = "";
  
  // 显示启动屏幕
  if (splashScreen) {
    splashScreen.style.display = "flex";
    splashScreen.classList.remove("hidden");
  }
  
  // 显示开始按钮，隐藏密码输入框
  if (startBtn) startBtn.style.display = "block";
  if (passwordContainer) {
    passwordContainer.style.display = "none";
    passwordContainer.classList.remove("show");
  }
  
  // 隐藏主内容和侧边栏
  if (mainContent) mainContent.style.opacity = "0";
  if (sidebar) sidebar.style.opacity = "0";
  
  // 显示通知
  FinancialClauseEngine.showNotification("应用已锁定，请重新输入密码", "success");
}

// 添加全局键盘事件监听器
document.addEventListener("keydown", (e) => {
  // 检测 Ctrl+Alt+L 组合键
  if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "l") {
    e.preventDefault(); // 阻止默认行为
    lockApplication(); // 锁定应用
  }
});

  // 主题切换
  const themeToggle = document.getElementById("theme-toggle")
  const lightIcon = document.querySelector(".theme-light-icon")
  const darkIcon = document.querySelector(".theme-dark-icon")

  if (themeToggle && lightIcon && darkIcon) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark")
      lightIcon.classList.toggle("hidden")
      darkIcon.classList.toggle("hidden")

      // 保存主题设置到本地存储
      localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light")

      // 添加这行代码，确保在切换主题时应用增强样式
      if (document.body.classList.contains("dark")) {
        document.documentElement.style.colorScheme = "dark"
      } else {
        document.documentElement.style.colorScheme = "light"
      }
    })
  }

  // 从本地存储加载主题设置
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark" && lightIcon && darkIcon) {
    document.body.classList.add("dark")
    lightIcon.classList.add("hidden")
    darkIcon.classList.remove("hidden")
    document.documentElement.style.colorScheme = "dark" // 添加这行代码
  } else {
    document.documentElement.style.colorScheme = "light" // 添加这行代码
  }

  // 初始化应用
  FinancialClauseEngine.init()

  // 初始化火险报价面板的交互功能
  initFireQuotePanel()

  // 新增：确保上传区域始终可点击
  const uploadArea = document.getElementById("upload-area")
  if (uploadArea) {
    uploadArea.style.position = "relative"
    uploadArea.style.zIndex = "5" // 确保上传区域有足够高的z-index
  }

  // 新增：初始化时确保所有非活动面板不会阻挡点击
  /*
  document.querySelectorAll(".panel-content:not(.active)").forEach((panel) => {
    panel.style.zIndex = "-1"
  })
  */

  // 确保所有面板都有正确的z-index
  document.querySelectorAll(".panel-content").forEach((panel) => {
    panel.style.zIndex = "1"
  })

  // 新增：确保所有隐藏的模态窗口不会阻挡点击
  document.querySelectorAll(".modal:not(.show)").forEach((modal) => {
    modal.style.zIndex = "-1"
  })
})

// 确保外部库可用
const checkExternalLibraries = () => {
  if (!window.XLSX) {
    console.warn("XLSX库未加载，文件解析功能可能不可用")
  }
  if (!window.saveAs) {
    console.warn("FileSaver库未加载，导出功能可能不可用")
  }
  if (!window.docx) {
    console.warn("docx库未加载，文档生成功能可能不可用")
  }
  if (!window.confetti) {
    console.warn("confetti库未加载，视觉效果可能不可用")
  }
  if (!window.PizZip) {
    console.warn("PizZip库未加载，文档生成功能可能不可用")
  }
  if (!window.docxtemplater) {
    console.warn("docxtemplater库未加载，文档生成功能可能不可用")
  }
}

// 在DOMContentLoaded事件中检查库
document.addEventListener("DOMContentLoaded", () => {
  checkExternalLibraries()
  // 其他初始化代码...
})

// 添加显示加载动画的函数
const showLoadingAnimation = (message = "正在处理...") => {
  const loadingContainer = document.getElementById("loading-container")
  const loadingText = document.getElementById("loading-text")
  const progressBar = document.getElementById("loading-progress-bar")

  if (loadingText) loadingText.textContent = message
  if (progressBar) progressBar.style.width = "0%"
  if (loadingContainer) {
    loadingContainer.classList.add("show")
  }
}

// 添加隐藏加载动画的函数
const hideLoadingAnimation = () => {
  const loadingContainer = document.getElementById("loading-container")
  if (loadingContainer) {
    loadingContainer.classList.remove("show")
  }
}

// 添加更新进度条的函数
const updateLoadingProgress = (percent, message = null) => {
  const progressBar = document.getElementById("loading-progress-bar")
  const loadingText = document.getElementById("loading-text")

  if (progressBar) {
    progressBar.style.width = `${percent}%`
  }
  if (message && loadingText) loadingText.textContent = message
}

// 这里保留原有的FinancialClauseEngine代码，但进行了适当的修改以适应新的UI
const FinancialClauseEngine = (() => {
  // 状态管理系统
  let workbook = null
  let worksheet = null
  const state = {
    headers: [],
    headerMap: new Map(),
    selectedClauses: new Set(),
    currentData: [],
    allData: [],
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
    fileLoaded: false,
    currentTemplate: null,
    currentMode: "chinese",
    limitValues: new Map(),
    dynamicLimits: new Map(),
    savedPackages: new Map(),
    currentPackageId: 1,
    rowCodeMap: new Map(),
    codeRowMap: new Map(),
  }

  // DOM元素缓存
  const elements = {
    fileInput: document.getElementById("file-input"),
    searchInput: document.getElementById("search-input"),
    searchBtn: document.getElementById("search-btn"),
    resetBtn: document.getElementById("reset-btn"),
    resultsBody: document.getElementById("results-body"),
    resultsTable: document.querySelector(".results-table"),
    previewModal: document.getElementById("preview-modal"),
    previewItems: document.getElementById("preview-items"),
    exportBtn: document.getElementById("export-docx"),
    closePreview: document.getElementById("close-preview"),
    closePreviewBtn: document.getElementById("close-preview-btn"),
    previewSelectedBtn: document.getElementById("preview-selected-btn"),
    paginationControls: document.getElementById("pagination-controls"),
    selectedCount: document.getElementById("selected-count"),
    simplePreviewBtn: document.getElementById("simple-preview-btn"),
    simplePreviewModal: document.getElementById("simple-preview-modal"),
    simplePreviewItems: document.getElementById("simple-preview-items"),
    closeSimplePreview: document.getElementById("close-simple-preview"),
    closeSimplePreviewBtn: document.getElementById("close-simple-preview-btn"),
    copyNamesBtn: document.getElementById("copy-names-btn"),
    detailModal: document.getElementById("detail-modal"),
    detailGrid: document.getElementById("detail-grid"),
    closeDetail: document.getElementById("close-detail"),
    fileStatus: document.getElementById("file-status"),
    quotePanel: document.getElementById("quote-panel"),
    closeQuotePanelBtn: document.getElementById("close-quote-panel"),
    packagesList: document.getElementById("packages-list"),
    modalBackdrop: document.getElementById("modal-backdrop"),
    selectAll: document.getElementById("select-all"),
    savePackageBtn: document.getElementById("save-package-btn"),
    languageMode: document.getElementById("language-mode"),
  }

  // 更新选择UI
  const updateSelectionUI = () => {
    if (elements.selectedCount) {
      elements.selectedCount.textContent = state.selectedClauses.size > 0 ? `(${state.selectedClauses.size})` : ""
    }

    if (elements.previewSelectedBtn) {
      elements.previewSelectedBtn.disabled = state.selectedClauses.size === 0
    }

    // 更新每个条款行的复选框状态
    document.querySelectorAll(".clause-checkbox").forEach((checkbox) => {
      const clauseId = checkbox.dataset.index
      if (clauseId) {
        checkbox.checked = state.selectedClauses.has(clauseId)
      }
    })

    // 更新全选复选框状态
    const currentPageCheckboxes = document.querySelectorAll(".clause-checkbox")
    const allChecked = currentPageCheckboxes.length > 0 && Array.from(currentPageCheckboxes).every((cb) => cb.checked)

    if (elements.selectAll) {
      elements.selectAll.checked = allChecked
    }
  }

  // 初始化本地存储
  const initLocalStorage = () => {
    try {
      // 加载条款包数据
      const savedPackagesData = JSON.parse(localStorage.getItem("savedPackages") || "[]")
      if (Array.isArray(savedPackagesData)) {
        state.savedPackages = new Map(
          savedPackagesData.map((pkgEntry) => {
            const [id, pkg] = Array.isArray(pkgEntry) ? pkgEntry : [pkgEntry?.id, pkgEntry]
            const clauses = pkg?.clauses ? new Set(Array.isArray(pkg.clauses) ? pkg.clauses : []) : new Set()
            let limits = new Map()
            if (pkg?.limits) {
              if (Array.isArray(pkg.limits)) {
                limits = new Map(pkg.limits)
              } else if (typeof pkg.limits === "object") {
                limits = new Map(Object.entries(pkg.limits))
              }
            }
            return [
              id,
              {
                ...pkg,
                clauses,
                limits,
                count: pkg.count || clauses.size,
              },
            ]
          }),
        )
      }

      // 加载当前打包序号
      state.currentPackageId = Number.parseInt(localStorage.getItem("currentPackageId")) || 1

      // 加载界面模式
      const validModes = new Set(["chinese", "english", "bilingual"])
      const storedMode = localStorage.getItem("currentMode")
      state.currentMode = validModes.has(storedMode) ? storedMode : "chinese"
      document.getElementById("language-mode").value = state.currentMode

      // 加载文件数据
      const storedAllData = JSON.parse(localStorage.getItem("allData") || "[]")
      if (Array.isArray(storedAllData) && storedAllData.length > 0) {
        state.allData = storedAllData
        state.fileLoaded = true
      }

      // 更新UI
      updateSavedPackagesUI()
      if (state.fileLoaded) {
        performSearch(true)
      }
    } catch (error) {
      console.error("本地存储初始化失败:", error)
      showNotification("本地存储数据异常，正在重置...", "error")
      localStorage.clear()
      setTimeout(() => location.reload(), 1500)
    }
  }

  // 更新已保存条款包UI
  const updateSavedPackagesUI = () => {
    elements.packagesList.innerHTML = ""

    if (state.savedPackages.size === 0) {
      elements.packagesList.innerHTML = `
    <div class="empty-packages-message">
      <svg class="empty-packages-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12H16L14 15H10L8 12H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5.45 5.11L2 12V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V12L18.55 5.11C18.3844 4.77679 18.1292 4.49637 17.813 4.30028C17.4967 4.10419 17.1321 4.0002 16.76 4H7.24C6.86792 4.0002 6.50326 4.10419 6.18704 4.30028C5.87083 4.49637 5.61558 4.77679 5.45 5.11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p>暂无保存的条款包</p>
    </div>
  `
    } else {
      Array.from(state.savedPackages).forEach(([id, pkg]) => {
        const packageItem = document.createElement("div")
        packageItem.className = "package-item"
        packageItem.dataset.packageId = id

        // 格式化日期
        const timestamp = new Date(pkg.timestamp)
        const formattedDate = `${timestamp.getFullYear()}-${String(timestamp.getMonth() + 1).padStart(2, "0")}-${String(timestamp.getDate()).padStart(2, "0")}`

        packageItem.innerHTML = `
                    <svg class="package-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 12H16L14 15H10L8 12H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5.45 5.11L2 12V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V12L18.55 5.11C18.3844 4.77679 18.1292 4.49637 17.813 4.30028C17.4967 4.10419 17.1321 4.0002 16.76 4H7.24C6.86792 4.0002 6.50326 4.10419 6.18704 4.30028C5.87083 4.49637 5.61558 4.77679 5.45 5.11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div>
                        <div class="package-name">${pkg.name}</div>
                        <div class="package-meta">${pkg.count} 条款 · ${formattedDate}</div>
                    </div>
                    <div class="package-actions">
                        <button class="package-action-btn restore-btn" data-id="${id}" title="恢复此条款包">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3M3 12H9M3 12L6 9M3 12L6 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <button class="package-action-btn delete-btn" data-id="${id}" title="删除此条款包">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                `
        elements.packagesList.appendChild(packageItem)
      })

      // 添加事件监听
      document.querySelectorAll(".package-item").forEach((item) => {
        item.addEventListener("click", (e) => {
          if (!e.target.closest(".package-action-btn")) {
            restorePackage(item.dataset.packageId)
          }
        })
      })

      document.querySelectorAll(".restore-btn").forEach((btn) => {
        btn.addEventListener("click", () => restorePackage(btn.dataset.id))
      })

      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", () => deletePackage(btn.dataset.id))
      })
    }
  }

  // 恢复条款包
  const restorePackage = (packageId) => {
    const pkg = state.savedPackages.get(packageId)
    if (!pkg) return

    // 清空当前选择
    state.selectedClauses.clear()
    state.limitValues.clear()

    // 恢复限额信息
    if (pkg.limits && pkg.limits.size > 0) {
      state.limitValues = new Map(pkg.limits)
    }

    // 根据条款编码查找对应行号
    pkg.clauses.forEach((clauseCode) => {
      const rowIndex = state.codeRowMap.get(clauseCode) - 1
      if (typeof rowIndex !== "undefined") {
        state.selectedClauses.add(rowIndex.toString())
      }
    })

    // 更新UI
    updateSelectionUI()
    performSearch(true)
    renderPaginationControls()
    refreshLimitDisplays()

    document.getElementById("language-mode").value = pkg.mode
    state.currentMode = pkg.mode

    // 高亮当前选中的包
    document.querySelectorAll(".package-item").forEach((item) => {
      item.classList.remove("active")
      if (item.dataset.packageId === packageId) {
        item.classList.add("active")

        // 添加以下代码，增强选中效果
        // 添加短暂的强调动画
        item.style.transform = "scale(1.02)"
        setTimeout(() => {
          item.style.transform = ""
        }, 300)
      }
    })

    showNotification(`已恢复条款包：${pkg.name}`, "success")
  }

  // 删除条款包
  const deletePackage = (packageId) => {
    if (!confirm("确定要删除这个条款包吗？")) return

    state.savedPackages.delete(packageId)
    updateSavedPackagesUI()
    localStorage.setItem("savedPackages", JSON.stringify(Array.from(state.savedPackages)))
    showNotification("条款包已删除", "success")
  }

  // 保存条款包
  const handleSavePackage = () => {
    if (state.selectedClauses.size === 0) {
      showNotification("当前没有选中条款，无法保存空包", "error")
      return
    }

    const packageName = prompt("请输入条款包名称（可选）:", `条款包-${state.currentPackageId}`)
    if (packageName === null) return

    const remark = prompt("请输入备注（可选）:")

    const packageData = {
      id: `PACKAGE-${Date.now()}`,
      name: packageName || `条款包-${state.currentPackageId}`,
      remark: remark || "",
      timestamp: new Date().toISOString(),
      clauses: Array.from(state.selectedClauses).map((rowIndex) => state.rowCodeMap.get(Number.parseInt(rowIndex) + 1)),
      limits: Array.from(state.limitValues),
      mode: state.currentMode,
      count: state.selectedClauses.size,
    }

    // 过滤空值
    packageData.clauses = packageData.clauses.filter((code) => !!code)
    packageData.count = packageData.clauses.length

    state.savedPackages.set(packageData.id, packageData)
    state.currentPackageId++
    updateSavedPackagesUI()

    // 本地存储
    localStorage.setItem("savedPackages", JSON.stringify(Array.from(state.savedPackages)))
    localStorage.setItem("currentPackageId", state.currentPackageId)

    showNotification("条款包保存成功！", "success")
  }

  // 新建空包
  const handleNewPackage = () => {
    const hasActivePackage = state.selectedClauses.size > 0 || state.limitValues.size > 0

    if (!hasActivePackage) {
      showNotification("已经是空包了，请继续当前页面操作", "success")
      return
    }

    if (!confirm("确定要放弃当前选中的条款吗？")) return

    // 重置状态
    state.selectedClauses.clear()
    state.limitValues.clear()
    state.currentPackageId++

    // 更新UI
    performSearch(true)
    updateSelectionUI()
    renderPaginationControls()

    // 移除所有包的激活状态
    document.querySelectorAll(".package-item").forEach((item) => {
      item.classList.remove("active")
    })

    showNotification("已创建新的空白条款包", "success")
  }

  // 刷新限额显示
  const refreshLimitDisplays = () => {
    document.querySelectorAll(".limit-inputs input").forEach((input) => {
      const clauseCode = input.closest(".preview-item").dataset.clauseCode
      const field = input.dataset.field
      const limitData = state.limitValues.get(clauseCode) || {}
      input.value = limitData[field] || ""
    })

    if (elements.previewModal.classList.contains("show")) {
      showFullPreview()
    }
  }

  // 显示通知
  const showNotification = (message, type = "success", title = "") => {
    // 移除现有通知
    document.querySelectorAll(".notification").forEach((n) => n.remove())

    const notification = document.createElement("div")
    notification.className = `notification ${type}`

    // 添加最高z-index值，确保通知显示在最上层
    notification.style.zIndex = "9999"
    notification.style.position = "fixed"

    const iconSvg =
      type === "success"
        ? '<svg class="notification-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 4L12 14.01L9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        : '<svg class="notification-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 9V13M12 17H12.01M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.3869 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'

    notification.innerHTML = `
    ${iconSvg}
    <div class="notification-content">
        ${title ? `<div class="notification-title">${title}</div>` : ""}
        <div class="notification-message">${message}</div>
    </div>
  `

    // 创建一个容器元素，确保通知始终显示在最上层
    let notificationContainer = document.getElementById("notification-container")
    if (!notificationContainer) {
      notificationContainer = document.createElement("div")
      notificationContainer.id = "notification-container"
      notificationContainer.style.position = "fixed"
      notificationContainer.style.bottom = "20px"
      notificationContainer.style.right = "20px"
      notificationContainer.style.zIndex = "9999"
      notificationContainer.style.pointerEvents = "none" // 允许点击通过
      document.body.appendChild(notificationContainer)
    }

    // 将通知添加到容器中，而不是直接添加到body
    notificationContainer.appendChild(notification)

    // 恢复通知的pointer-events，使其可以点击
    notification.style.pointerEvents = "auto"

    // 使用requestAnimationFrame确保DOM更新后再添加show类
    requestAnimationFrame(() => {
      notification.classList.add("show")
    })

    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => notification.remove(), 300)
    }, 3000)
  }

  // 事件监听初始化
  const initEventListeners = () => {
    // 文件上传和搜索相关
    if (elements.fileInput) elements.fileInput.addEventListener("change", handleFileUpload)
    if (elements.searchBtn) elements.searchBtn.addEventListener("click", () => performSearch(true))
    if (elements.searchInput)
      elements.searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") performSearch(true)
      })
    if (elements.resetBtn) elements.resetBtn.addEventListener("click", handleReset)

    // 预览和导出相关
    if (elements.previewSelectedBtn) elements.previewSelectedBtn.addEventListener("click", showFullPreview)
    if (elements.simplePreviewBtn) elements.simplePreviewBtn.addEventListener("click", showSimplePreview)
    if (elements.exportBtn) elements.exportBtn.addEventListener("click", exportToDocx)
    if (elements.closePreview) elements.closePreview.addEventListener("click", () => hideModal(elements.previewModal))
    if (elements.closePreviewBtn)
      elements.closePreviewBtn.addEventListener("click", () => hideModal(elements.previewModal))
    if (elements.closeSimplePreview)
      elements.closeSimplePreview.addEventListener("click", () => hideModal(elements.simplePreviewModal))
    if (elements.closeSimplePreviewBtn)
      elements.closeSimplePreviewBtn.addEventListener("click", () => hideModal(elements.simplePreviewModal))
    if (elements.copyNamesBtn) elements.copyNamesBtn.addEventListener("click", copyNamesToClipboard)

    // 详情和报价相关
    if (elements.closeDetail) elements.closeDetail.addEventListener("click", () => hideModal(elements.detailModal))
    const startQuoteBtn = document.getElementById("start-quote-btn")
    if (startQuoteBtn && elements.quotePanel)
      startQuoteBtn.addEventListener("click", () => showModal(elements.quotePanel))
    if (elements.closeQuotePanelBtn)
      elements.closeQuotePanelBtn.addEventListener("click", () => hideModal(elements.quotePanel))

    // 全选复选框
    if (elements.selectAll) {
      elements.selectAll.addEventListener("change", (e) => {
        const currentPageRows = document.querySelectorAll(".clause-row")
        const isChecked = e.target.checked

        currentPageRows.forEach((row) => {
          const clauseId = row.dataset.clauseId
          if (isChecked) {
            state.selectedClauses.add(clauseId)
          } else {
            state.selectedClauses.delete(clauseId)
          }
        })

        updateSelectionUI()
      })
    }

    // 新增条款包管理按钮
    const newPackageBtn = document.querySelector(".new-package-btn")
    if (newPackageBtn) newPackageBtn.addEventListener("click", handleNewPackage)

    // 添加保存条款包按钮事件监听
    const savePackageBtn = document.getElementById("save-package-btn")
    if (savePackageBtn) {
      savePackageBtn.addEventListener("click", handleSavePackage)
    }

    // 添加导出已保存包按钮事件监听
    const exportPackagesBtn = document.querySelector(".export-packages-btn")
    if (exportPackagesBtn) {
      exportPackagesBtn.addEventListener("click", handleExportPackages)
    }

    // 语言模式切换
    if (elements.languageMode) {
      elements.languageMode.addEventListener("change", (e) => {
        state.currentMode = e.target.value
        localStorage.setItem("currentMode", state.currentMode)

        const modeNames = {
          chinese: "中文模式",
          english: "英文模式",
          bilingual: "中英双语模式",
        }
        showNotification(`已切换至${modeNames[e.target.value] || "未知模式"}`, "success")

        // 添加这行代码，确保自定义下拉框与原始select同步
        if (window.initializeAllDropdowns) {
          window.initializeAllDropdowns()
        }
      })
    }

    // 报��面板选项卡切换
    document.querySelectorAll(".quote-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        if (tab.classList.contains("active")) return

        const activeTab = document.querySelector(".quote-tab.active")
        if (activeTab) activeTab.classList.remove("active")
        tab.classList.add("active")

        const currentPanel = document.querySelector(".panel-content.active")
        const newPanel = document.querySelector(`.panel-content[data-panel="${tab.dataset.tab}"]`)

        if (currentPanel) {
          currentPanel.classList.remove("active")
          // 移除这行，不要设置z-index为-1
          // currentPanel.style.zIndex = "-1";
        }

        if (newPanel) {
          newPanel.classList.add("active")
          // 确保活动面板有正确的z-index
          newPanel.style.zIndex = "1"
        }
      })
    })

    // 模板上传
    const templateInput = document.getElementById("template-upload")
    if (templateInput) {
      templateInput.addEventListener("change", (e) => {
        const file = e.target.files[0]
        if (!file) return

        const filenameDisplay = document.getElementById("template-filename")
        const sizeDisplay = document.getElementById("template-size")
        const statusDisplay = document.getElementById("template-status")

        if (filenameDisplay) filenameDisplay.textContent = file.name
        if (sizeDisplay) sizeDisplay.textContent = (file.size / 1024 / 1024).toFixed(2) + "MB"

        if (!file.name.endsWith(".docx")) {
          if (statusDisplay) {
            statusDisplay.textContent = "✗ 仅支持.docx格式"
            statusDisplay.style.color = "var(--destructive)"
          }
          templateInput.value = ""
          return
        }

        if (file.size > 5 * 1024 * 1024) {
          if (statusDisplay) {
            statusDisplay.textContent = "✗ 文件不能超过5MB"
            statusDisplay.style.color = "var(--destructive)"
          }
          templateInput.value = ""
          return
        }

        state.currentTemplate = file
        if (statusDisplay) {
          statusDisplay.textContent = "✓ 模板已就绪"
          statusDisplay.style.color = "#10b981"
        }
      })
    }

    // 移动端菜单切换
    const menuToggle = document.getElementById("menu-toggle")
    const sidebar = document.querySelector(".sidebar")

    if (menuToggle && sidebar) {
      menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open")
      })
    }

    // 模态窗口背景点击关闭
    if (elements.modalBackdrop) {
      elements.modalBackdrop.addEventListener("click", (e) => {
        // 只有当点击的是背景本身时才关闭模态窗口
        if (e.target === elements.modalBackdrop) {
          document.querySelectorAll(".modal.show").forEach((modal) => {
            hideModal(modal)
          })
        }
      })
    }
  }

  // 文件上传处理
  // 修改文件上传处理函数，在handleFileUpload函数中添加加载动画
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // 检查文件类型
    const validExtensions = [".xlsx", ".xls", ".xlsm"]
    const fileName = file.name.toLowerCase()
    const isValidFile = validExtensions.some((ext) => fileName.endsWith(ext))

    if (!isValidFile) {
      showNotification("请上传有效的Excel文件 (.xlsx, .xls, .xlsm)", "error")
      elements.fileStatus.textContent = "文件格式不支持"
      return
    }

    try {
      elements.fileStatus.textContent = "正在解析文件..."

      // 显示加载动画
      showLoadingAnimation("正在读取Excel文件...")

      // 使用setTimeout将耗时操作移到下一个事件循环，避免UI卡顿
      setTimeout(async () => {
        try {
          updateLoadingProgress(10, "正在读取文件数据...")
          const data = await readFile(file)

          if (!window.XLSX) {
            throw new Error("XLSX库未加载，无法解析Excel文件")
          }

          // 添加性能优化选项
          const options = {
            type: "array",
            cellStyles: true,
            cellHTML: true,
            raw: false, // 不需要原始值
            cellDates: false, // 不需要日期对象
            cellNF: false, // 不需要数字格式
            cellFormula: false, // 不需要公式
          }

          // 对于xlsm文件，禁用宏处理以提高性能
          if (fileName.endsWith(".xlsm")) {
            options.bookVBA = false
            options.cellFormula = false
          }

          // 显示加载中状态
          updateLoadingProgress(20, "正在解析Excel结构...")
          showNotification("正在处理文件，请稍候...", "success")

          // 使用setTimeout将耗时操作移到下一个事件循环，避免UI卡顿
          setTimeout(() => {
            try {
              updateLoadingProgress(30, "正在解析工作簿...")
              workbook = XLSX.read(data, options)
              worksheet = workbook.Sheets[workbook.SheetNames[0]]
              const range = XLSX.utils.decode_range(worksheet["!ref"])
              state.allData = []

              updateLoadingProgress(40, "正在处理表头...")
              // 使用批处理方式处理数据
              const batchSize = 1000
              const totalRows = range.e.r - range.s.r + 1

              // 处理表头
              const headerRow = []
              for (let C = range.s.c; C <= range.e.c; C++) {
                const cellAddress = XLSX.utils.encode_cell({ r: range.s.r, c: C })
                const cell = worksheet[cellAddress]
                headerRow[C] = { value: cell ? cell.w || cell.v : "", style: cell ? cell.s : null }
              }
              state.allData.push(headerRow)

              updateLoadingProgress(50, "正在处理数据行...")
              // 分批处理数据行
              const processRowBatch = (startRow, endRow) => {
                for (let R = startRow; R <= endRow; R++) {
                  if (R > range.e.r) break

                  const row = []
                  for (let C = range.s.c; C <= range.e.c; C++) {
                    const cellAddress = XLSX.utils.encode_cell({ r: R, c: C })
                    const cell = worksheet[cellAddress]
                    row[C] = {
                      value: cell ? cell.w || cell.v : "",
                      style: cell ? cell.s : null,
                      h: cell ? cell.h : null,
                    }
                  }
                  state.allData.push(row)
                }
              }

              // 处理第一批数据以快速显示
              const firstBatchEnd = Math.min(range.s.r + batchSize, range.e.r)
              processRowBatch(range.s.r + 1, firstBatchEnd)

              updateLoadingProgress(70, "正在设置表头映射...")
              // 设置表头映射
              state.headers = state.allData[0].map((cell) => cell.value)
              state.headerMap.clear()
              state.headers.forEach((header, index) => header && state.headerMap.set(header, index))

              updateLoadingProgress(80, "正在建立条款编码映射...")
              // 建立行号和条款编码的映射
              state.rowCodeMap.clear()
              state.codeRowMap.clear()
              state.allData.forEach((row, index) => {
                const codeCell = row[state.headerMap.get("条款编码")]
                if (codeCell && codeCell.value) {
                  state.rowCodeMap.set(index, codeCell.value)
                  state.codeRowMap.set(codeCell.value, index)
                }
              })

              updateLoadingProgress(90, "正在准备显示数据...")
              state.fileLoaded = true
              state.selectedClauses.clear()
              elements.fileStatus.textContent = ""

              // 显示第一批数据
              performSearch(true)

              updateLoadingProgress(100, "文件解析完成！")
              setTimeout(() => {
                hideLoadingAnimation()

                // 确保分页状态正确更新
  if (state.allData && state.allData.length > 1) {
    const totalItems = state.allData.length - 1; // 减去表头行
    state.totalPages = Math.ceil(totalItems / state.pageSize) || 1;
    renderPaginationControls();
  }
  
                showNotification("文件解析成功", "success")
              }, 500)

              // 自动执行部分重置功能，但保留已上传的文件数据
              elements.searchInput.value = ""
              state.currentPage = 1
              state.totalPages = 1
              state.selectedClauses.clear()

              // 更新预览按钮状态
              updateSelectionUI()

              // 如果有更多数据，在后台继续处理
              if (firstBatchEnd < range.e.r) {
                setTimeout(() => {
                  let nextStart = firstBatchEnd + 1
                  let processedRows = firstBatchEnd - range.s.r + 1
                  const totalRows = range.e.r - range.s.r + 1

                  const processNextBatch = () => {
                    const nextEnd = Math.min(nextStart + batchSize, range.e.r)
                    processRowBatch(nextStart, nextEnd)

                    // 更新映射
                    for (let i = nextStart; i <= nextEnd; i++) {
                      if (i > range.e.r) break
                      const row = state.allData[i]
                      const codeCell = row[state.headerMap.get("条款编码")]
                      if (codeCell && codeCell.value) {
                        state.rowCodeMap.set(i, codeCell.value)
                        state.codeRowMap.set(codeCell.value, i)
                      }
                    }

                    processedRows += nextEnd - nextStart + 1

                    nextStart = nextEnd + 1

                    if (nextStart <= range.e.r) {
                      // 使用requestIdleCallback或setTimeout继续处理下一批
                      if (window.requestIdleCallback) {
                        window.requestIdleCallback(processNextBatch)
                      } else {
                        setTimeout(processNextBatch, 0)
                      }
                    }
                  }

                  processNextBatch()
                }, 100)
              }
            } catch (error) {
              console.error("Excel解析过程中出错:", error)
              hideLoadingAnimation()
              showNotification(`Excel解析失败: ${error.message}`, "error")
            }
          }, 0)
        } catch (error) {
          console.error("文件解析失败:", error)
          elements.fileStatus.textContent = "文件解析失败"
          hideLoadingAnimation()
          showNotification(`文件解析失败: ${error.message}`, "error")
        }
      }, 0)
    } catch (error) {
      console.error("文件读取失败:", error)
      elements.fileStatus.textContent = "文件读取失败"
      hideLoadingAnimation()
      showNotification(`文件读取失败: ${error.message}`, "error")
    }
  }

  // 优化应用单元格样式函数
  const applyCellStyles = (() => {
    // 使用缓存减少重复计算
    const styleCache = new Map()

    return (cell, value) => {
      // 生成缓存键
      const cacheKey = cell ? `${cell.value}_${JSON.stringify(cell.style)}_${cell.h}` : `empty_${value}`

      // 检查缓存
      if (styleCache.has(cacheKey)) {
        return styleCache.get(cacheKey)
      }

      let result
      if (cell?.h) {
        const html = cell.h
          .replace(/<span style="[^"]*text-decoration:\s*underline[^"]*">/gi, "<u>")
          .replace(/<\/span>/gi, "</u>")
          .replace(/<u>/g, '<u style="text-decoration:underline">')
          .replace(/<span style="font-weight:\s*bold;?">/gi, "<strong>")
          .replace(/<\/span>/gi, "</strong>")
          .replace(/<\/span>/gi, "</u>")

        result = html.replace(/(\r\n|\n|\r)/gm, "<br/>")
      } else {
        let styled = String(value || "")
        styled = styled.replace(/\n/g, "<br/>")

        const shouldBold = cell?.s?.font?.bold
        const shouldUnderline = cell?.s?.font?.underline
        const shouldItalic = cell?.s?.font?.italic

        if (shouldItalic) styled = `<em>${styled}</em>`
        if (shouldUnderline) styled = `<u>${styled}</u>`
        if (shouldBold) styled = `<strong>${styled}</strong>`

        result = styled
      }

      // 缓存结果
      if (styleCache.size > 1000) {
        // 防止缓存过大，清除旧缓存
        const keys = Array.from(styleCache.keys())
        for (let i = 0; i < 200; i++) {
          styleCache.delete(keys[i])
        }
      }
      styleCache.set(cacheKey, result)

      return result
    }
  })()

  // 优化高亮搜索词函数
  const highlightSearchTerm = (() => {
    // 使用缓存减少重复计算
    const highlightCache = new Map()

    return (text, term) => {
      if (!term) return text

      // 生成缓存键
      const cacheKey = `${text}_${term}`

      // 检查缓存
      if (highlightCache.has(cacheKey)) {
        return highlightCache.get(cacheKey)
      }

      const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      const result = String(text).replace(new RegExp(`(${escapedTerm})`, "gi"), "<mark>$1</mark>")

      // 缓存结果
      if (highlightCache.size > 1000) {
        // 防止缓存过大，清除旧缓存
        const keys = Array.from(highlightCache.keys())
        for (let i = 0; i < 200; i++) {
          styleCache.delete(keys[i])
        }
      }
      highlightCache.set(cacheKey, result)

      return result
    }
  })()

  // 优化表格行点击处理
  const handleResultsTableClick = (e) => {
    // 使用事件委托处理点击事件
    const nameElement = e.target.closest(".clause-name")
    if (nameElement) {
      // 延迟显示详情，让UI先响应点击
      setTimeout(() => {
        showClauseDetail(nameElement.dataset.index)
      }, 10)
    }
  }

  // 优化表格行变更处理
  const handleResultsTableChange = (e) => {
    // 处理复选框变更
    if (e.target.classList.contains("clause-checkbox")) {
      const index = e.target.dataset.index
      if (e.target.checked) {
        state.selectedClauses.add(index)
      } else {
        state.selectedClauses.delete(index)
      }

      // 使用requestAnimationFrame确保UI更新在下一帧执行
      requestAnimationFrame(() => {
        updateSelectionUI()
      })
    }
  }

  // 优化显示条款详情函数
  const showClauseDetail = (index) => {
    try {
      const originalIndex = Number.parseInt(index) + 1
      const row = state.allData[originalIndex]
      if (!row) throw new Error("找不到对应条款数据")

      const fields = [
        { label: "条款编码", key: "条款编码" },
        { label: "条款名称", key: "名称" },
        { label: "中文产品工厂措辞", key: "中文产品工厂措辞" },
        { label: "英文名称", key: "英文名称" },
        { label: "条款英文措辞", key: "条款英文措辞" },
      ]

      // 使用文档片段减少DOM重绘
      const fragment = document.createDocumentFragment()

      fields.forEach((field) => {
        const cell = safeGetCell(row, field.key)
        const displayValue = applyCellStyles(cell, cell?.value)

        const labelDiv = document.createElement("div")
        labelDiv.className = "detail-label"
        labelDiv.textContent = field.label

        const valueDiv = document.createElement("div")
        valueDiv.className = "detail-value"
        valueDiv.innerHTML = displayValue || ""

        fragment.appendChild(labelDiv)
        fragment.appendChild(valueDiv)
      })

      elements.detailGrid.innerHTML = ""
      elements.detailGrid.appendChild(fragment)

      showModal(elements.detailModal)
    } catch (error) {
      console.error("显示条款详情失败:", error)
      showNotification(`打开详情失败: ${error.message}`, "error")
    }
  }

  // 修改 renderResults 函数，优化表格渲染和事件处理
  const renderResults = (results) => {
    const paginatedData = getPaginatedData(results)

    // 使用文档片段减少DOM重绘次数
    const fragment = document.createDocumentFragment()

    if (paginatedData.length) {
      paginatedData.forEach(({ index, data, searchTerm }) => {
        const row = document.createElement("tr")
        row.className = "clause-row"
        row.dataset.clauseId = index

        const codeCell = safeGetCell(data, "条款编码")
        const nameCell = safeGetCell(data, "名称")
        const categoryCell = safeGetCell(data, "产品类别")

        row.innerHTML = `
        <td>
          <div class="checkbox-wrapper">
            <input type="checkbox" class="custom-checkbox clause-checkbox" data-index="${index}" ${state.selectedClauses.has(String(index)) ? "checked" : ""}>
          </div>
        </td>
        <td>${applyCellStyles(codeCell, codeCell.value)}</td>
        <td><span class="clause-name" data-index="${index}">${applyCellStyles(nameCell, highlightSearchTerm(nameCell.value, searchTerm))}</span></td>
        <td>${applyCellStyles(categoryCell, highlightSearchTerm(categoryCell.value, searchTerm))}</td>
      `

        fragment.appendChild(row)
      })

      // 清空表格并一次性添加所有行
      elements.resultsBody.innerHTML = ""
      elements.resultsBody.appendChild(fragment)
    } else {
      elements.resultsBody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:32px;color:var(--muted-foreground)">未找到匹配结果</td></tr>`
    }

    // 使用事件委托添加事件监听
    addResultsEventListeners()
    updateSelectionUI()
  }

  // 优化事件委托函数
  const addResultsEventListeners = () => {
    // 确保结果表格存在
    if (!elements.resultsTable) return

    // 移除旧的事件监听器，防止重复绑定
    elements.resultsTable.removeEventListener("click", handleResultsTableClick)
    elements.resultsTable.removeEventListener("change", handleResultsTableChange)

    // 添加新的事件监听器
    elements.resultsTable.addEventListener("click", handleResultsTableClick)
    elements.resultsTable.addEventListener("change", handleResultsTableChange)
  }

  // 获取分页数据
  const getPaginatedData = (data) => {
    return data.slice((state.currentPage - 1) * state.pageSize, state.currentPage * state.pageSize)
  }

  // 更新分页状态
  const updatePaginationState = (dataLength) => {
    state.totalPages = Math.ceil(dataLength / state.pageSize) || 1
    state.currentPage = Math.min(state.currentPage, state.totalPages)
  }

  // 渲染分页控件
  const renderPaginationControls = () => {
    elements.paginationControls.innerHTML = `
            <div class="flex items-center gap-4">
                <button class="btn btn-outline btn-icon ${state.currentPage === 1 ? "disabled" : ""}" ${state.currentPage === 1 ? "disabled" : ""}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <span class="pagination-info">第 ${state.currentPage} 页 / 共 ${state.totalPages} 页</span>
                <button class="btn btn-outline btn-icon ${state.currentPage >= state.totalPages ? "disabled" : ""}" ${state.currentPage >= state.totalPages ? "disabled" : ""}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        `

    elements.paginationControls.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (btn.disabled) return
        state.currentPage += btn.querySelector("svg path").getAttribute("d").includes("15 18") ? -1 : 1
        performSearch(false)
      })
    })
  }

  // 显示完整预览
  const showFullPreview = () => {
    if (state.selectedClauses.size === 0) {
      showNotification("请先选择条款", "error")
      return
    }

    const items = Array.from(state.selectedClauses)
      .map((index) => {
        const row = state.allData[Number.parseInt(index) + 1]
        if (!row) return null

        const codeCell = safeGetCell(row, "条款编码")
        const clauseCode = codeCell.value
        const currentValues = state.limitValues.get(clauseCode) || {}
        const hasManualLimit = Object.values(currentValues).some((v) => v && v.trim && v.trim() !== "")

        const codeContent = `
        ${applyCellStyles(codeCell, codeCell.value)}
        ${hasManualLimit ? '<span class="limit-marker" title="已添加限额"></span>' : ""}
      `

        if (!row) return null

        try {
          const categoryCell = safeGetCell(row, "产品类别")
          const contentCell = safeGetCell(row, "中文产品工厂措辞")

          return {
            code: codeContent,
            clauseCode: clauseCode,
            category: applyCellStyles(categoryCell, categoryCell.value || ""),
            content: applyCellStyles(contentCell, contentCell.value || ""),
          }
        } catch (error) {
          console.error("处理预览内容时出错:", error)
          return {
            code: codeContent,
            clauseCode: clauseCode,
            category: "无法加载类别",
            content: "无法加载内容，请检查数据格式",
          }
        }
      })
      .filter(Boolean)

    elements.previewItems.innerHTML = items
      .map((item) => {
        const savedValues = state.limitValues.get(item.clauseCode) || {}

        return `
        <div class="preview-item" data-clause-code="${item.clauseCode}">
          <div>${item.code}</div>
          <div>${item.category}</div>
          <div>${item.content}</div>
          <div class="limit-controls">
            <div class="limit-inputs">
              <input type="text" placeholder="累计限额" data-field="total" value="${savedValues.total || ""}">
              <input type="text" placeholder="每次限额" data-field="perOccurrence" value="${savedValues.perOccurrence || ""}">
              <input type="text" placeholder="免赔额" data-field="deductible" value="${savedValues.deductible || ""}">
              <input type="text" placeholder="备注" data-field="remark" value="${savedValues.remark || ""}">
            </div>
          </div>
        </div>
      `
      })
      .join("")

    // 添加限额输入事件
    document.querySelectorAll(".limit-inputs input").forEach((input) => {
      input.addEventListener("input", (e) => {
        const clauseCode = e.target.closest(".preview-item").dataset.clauseCode
        const field = e.target.dataset.field
        const value = e.target.value

        // 更新限额值
        const currentValues = state.limitValues.get(clauseCode) || {}
        currentValues[field] = value
        state.limitValues.set(clauseCode, currentValues)
      })
    })

    showModal(elements.previewModal)
  }

  // 显示简单预览
  const showSimplePreview = () => {
    const items = Array.from(state.selectedClauses)
      .map((index) => {
        const row = state.allData[Number.parseInt(index) + 1]
        if (!row) return null

        const code = safeGetCell(row, "条款编码").value
        const chineseName = safeGetCell(row, "名称").value
        const englishName = safeGetCell(row, "英文名称").value
        const limits = state.limitValues.get(code) || {}

        let displayText
        let displayName
        switch (state.currentMode) {
          case "english": {
            const enLimits = [
              limits.total && `In Aggregate: ${limits.total}`,
              limits.perOccurrence && `Each Occurrence: ${limits.perOccurrence}`,
              limits.deductible && `Deductible: ${limits.deductible}`,
            ]
              .filter(Boolean)
              .join("; ")
            const enRemark = limits.remark ? `(Remark: ${limits.remark})` : ""
            displayText = `${code} - ${englishName}${enLimits ? ` (${enLimits})` : ""}${enRemark ? ` ${enRemark}` : ""}`
            break
          }
          case "bilingual": {
            const englishNameCell = safeGetCell(row, "英文名称")
            const nameCell = safeGetCell(row, "名称")
            displayName = `${englishNameCell.value || ""} ${nameCell.value || ""}`

            const hasLimits = limits.total || limits.perOccurrence || limits.deductible
            const hasRemark = limits.remark && limits.remark.trim() !== ""

            let displayLimits = ""
            let displayRemark = ""

            if (hasLimits) {
              const limitParts = []
              if (limits.total) limitParts.push(`In Aggregate 累计限额: ${limits.total}`)
              if (limits.perOccurrence) limitParts.push(`Each Occurrence 每次限额: ${limits.perOccurrence}`)
              if (limits.deductible) limitParts.push(`Deductible 免赔额: ${limits.deductible}`)
              displayLimits = limitParts.join("; ")
            }

            if (hasRemark) {
              displayRemark = `Remark 备注: ${limits.remark}`
            }
            const biEnLimits = [
              limits.total && `In Aggregate: ${limits.total}`,
              limits.perOccurrence && `Each Occurrence: ${limits.perOccurrence}`,
              limits.deductible && `Deductible: ${limits.deductible}`,
            ]
              .filter(Boolean)
              .join("; ")
            const biCnLimits = [
              limits.total && `累计限额: ${limits.total}`,
              limits.perOccurrence && `每次限额: ${limits.perOccurrence}`,
              limits.deductible && `免赔额: ${limits.deductible}`,
            ]
              .filter(Boolean)
              .join("; ")
            const biEnRemark = limits.remark ? `(Remark: ${limits.remark})` : ""
            const biCnRemark = limits.remark ? `(备注: ${limits.remark})` : ""
            displayText = `${code} - ${englishName}${biEnLimits ? ` (${biEnLimits})` : ""}${biEnRemark ? ` ${biEnRemark}` : ""} - ${chineseName}${biCnLimits ? ` (${biCnLimits})` : ""}${biCnRemark ? ` ${biCnRemark}` : ""}`
            break
          }
          default: {
            // chinese
            const cnLimits = [
              limits.total && `累计限额: ${limits.total}`,
              limits.perOccurrence && `每次限额: ${limits.perOccurrence}`,
              limits.deductible && `免赔额: ${limits.deductible}`,
            ]
              .filter(Boolean)
              .join("; ")
            const cnRemark = limits.remark ? `(备注: ${limits.remark})` : ""
            displayText = `${code} - ${chineseName}${cnLimits ? ` (${cnLimits})` : ""}${cnRemark ? ` ${cnRemark}` : ""}`
          }
        }
        return { display: displayText }
      })
      .filter(Boolean)

    elements.simplePreviewItems.innerHTML = items
      .map(
        (item) => `
            <div class="p-4 border-b border-border">${item.display}</div>
        `,
      )
      .join("")

    showModal(elements.simplePreviewModal)
  }

  // 复制条款名称到剪贴板
  const copyNamesToClipboard = () => {
    if (state.selectedClauses.size === 0) {
      showNotification("请先选择要复制的条款", "error")
      return
    }

    const clausesText = Array.from(state.selectedClauses)
      .map((index) => {
        const row = state.allData[Number.parseInt(index) + 1]
        if (!row) return null

        const code = safeGetCell(row, "条款编码").value
        const chineseName = safeGetCell(row, "名称").value
        const englishName = safeGetCell(row, "英文名称").value
        const limits = state.limitValues.get(code) || {}

        switch (state.currentMode) {
          case "english": {
            const enLimits = [
              limits.total && `In Aggregate: ${limits.total}`,
              limits.perOccurrence && `Each Occurrence: ${limits.perOccurrence}`,
              limits.deductible && `Deductible: ${limits.deductible}`,
            ]
              .filter(Boolean)
              .join("; ")
            const enRemark = limits.remark ? `(Remark: ${limits.remark})` : ""
            return `${code} - ${englishName}${enLimits ? ` (${enLimits})` : ""}${enRemark ? ` ${enRemark}` : ""}`
          }
          case "bilingual": {
            const biEnLimits = [
              limits.total && `In Aggregate: ${limits.total}`,
              limits.perOccurrence && `Each Occurrence: ${limits.perOccurrence}`,
              limits.deductible && `Deductible: ${limits.deductible}`,
            ]
              .filter(Boolean)
              .join("; ")
            const biCnLimits = [
              limits.total && `累计限额: ${limits.total}`,
              limits.perOccurrence && `每次限额: ${limits.perOccurrence}`,
              limits.deductible && `免赔额: ${limits.deductible}`,
            ]
              .filter(Boolean)
              .join("; ")
            const biEnRemark = limits.remark ? `(Remark: ${limits.remark})` : ""
            const biCnRemark = limits.remark ? `(备注: ${limits.remark})` : ""
            return `${code} - ${englishName}${biEnLimits ? ` (${biEnLimits})` : ""}${biEnRemark ? ` ${biEnRemark}` : ""} - ${chineseName}${biCnLimits ? ` (${biCnLimits})` : ""}${biCnRemark ? ` ${biCnRemark}` : ""}`
          }
          default: {
            // chinese
            const cnLimits = [
              limits.total && `累计限额: ${limits.total}`,
              limits.perOccurrence && `每次限额: ${limits.perOccurrence}`,
              limits.deductible && `免赔额: ${limits.deductible}`,
            ]
              .filter(Boolean)
              .join("; ")
            const cnRemark = limits.remark ? `(备注: ${limits.remark})` : ""
            return `${code} - ${chineseName}${cnLimits ? ` (${cnLimits})` : ""}${cnRemark ? ` ${cnRemark}` : ""}`
          }
        }
      })
      .filter(Boolean)
      .join("\n")

    navigator.clipboard
      .writeText(clausesText)
      .then(() => {
        showNotification("已复制到剪贴板", "success")
      })
      .catch((err) => {
        showNotification(`复制失败: ${err.message}`, "error")
      })
  }

  // 导出到DOCX
  const exportToDocx = async () => {
    try {
      if (state.selectedClauses.size === 0) {
        showNotification("请先选择要导出的条款", "error")
        return
      }

      if (!window.docx) {
        throw new Error("docx库未加载，无法生成文档")
      }

      elements.exportBtn.disabled = true
      elements.exportBtn.innerHTML = '<span class="loading"></span> 生成中...'

      // 根据当前语言模式配置导出参数
      const modeConfig = {
        chinese: {
          columns: ["中文产品工厂措辞"],
          nameColumns: ["名称"],
          suffixes: ["_CN"],
        },
        english: {
          columns: ["条款英文措辞"],
          nameColumns: ["英文名称"],
          suffixes: ["_EN"],
        },
        bilingual: {
          columns: ["中文产品工厂措辞", "条款英文措辞"],
          nameColumns: ["名称", "英文名称"],
          suffixes: ["_CN", "_EN"],
        },
      }[state.currentMode]

      const timestamp = new Date().getTime()
      const baseStyle = {
        paragraphStyles: [
          {
            id: "Normal",
            name: "Normal",
            basedOn: "Normal",
            next: "Normal",
            run: {
              font: { ascii: "Georgia", eastAsia: "宋体", hint: "eastAsia" },
              size: 22, // 统一字号为11pt（22 half-points）
            },
            paragraph: {
              spacing: { line: 276 },
              indent: { left: 720 },
            },
          },
        ],
      }

      // 增强版HTML解析器
      const parseContent = (row, column) => {
        const codeCell = safeGetCell(row, "条款编码")
        const contentCell = safeGetCell(row, column)
        const textRuns = []
        let currentText = ""
        const styleStack = { bold: [], underline: [], italic: [], fontSize: null }

        const walkNodes = (node) => {
          const processNode = (currentNode) => {
            // 处理开始标签
            if (currentNode.nodeType === Node.ELEMENT_NODE) {
              const style = currentNode.style
              const tagName = currentNode.tagName.toLowerCase()

              // 处理内联样式下划线（支持多种浏览器写法）
              const hasUnderline = ["underline", "text-underline-position", "text-decoration-line"].some(
                (prop) => style[prop]?.includes("underline") || style.cssText?.includes("underline"),
              )

              if (hasUnderline) {
                pushTextRun()
                styleStack.underline.push({
                  type: "style",
                  node: currentNode,
                  depth: styleStack.underline.length,
                })
              }

              // 处理标签类型
              switch (tagName) {
                case "strong":
                case "b":
                  pushTextRun()
                  styleStack.bold.push(true)
                  break
                case "u":
                  if (!hasUnderline) {
                    // 仅处理纯标签下划线
                    pushTextRun()
                    styleStack.underline.push({
                      type: "tag",
                      node: currentNode,
                      depth: styleStack.underline.length,
                    })
                  }
                  break
                case "em":
                case "i":
                  pushTextRun()
                  styleStack.italic.push(true)
                  break
                case "span":
                  if (currentNode.style?.fontSize) {
                    const fontSizeMatch = currentNode.style.fontSize.match(/(\d+)(?:\.\d+)?\s*pt/)
                    if (fontSizeMatch) {
                      pushTextRun()
                      styleStack.fontSize = Number.parseInt(fontSizeMatch[1]) * 2 // pt转half-points
                    }
                  }
                  break
                case "br":
                  pushTextRun()
                  textRuns.push(new window.docx.TextRun({ break: 1 }))
                  return // 跳过子节点处理
              }
            }

            // 处理文本内容
            if (currentNode.nodeType === Node.TEXT_NODE) {
              currentText += currentNode.textContent.replace(/\u00A0/g, " ")
            }

            // 递归处理子节点（深度优先遍历）
            const childNodes = Array.from(currentNode.childNodes)
            for (let i = 0; i < childNodes.length; i++) {
              processNode(childNodes[i])
            }

            // 处理结束标签
            if (currentNode.nodeType === Node.ELEMENT_NODE) {
              const style = currentNode.style
              const tagName = currentNode.tagName.toLowerCase()

              // 处理内联样式下划线结束
              if (styleStack.underline.length > 0) {
                const underlineEntry = styleStack.underline[styleStack.underline.length - 1]
                const shouldPop =
                  ((underlineEntry.type === "style" &&
                    (style?.textDecoration?.includes("underline") || style?.textDecorationLine === "underline")) ||
                    (underlineEntry.type === "tag" && tagName === "u")) &&
                  underlineEntry.node === currentNode

                if (shouldPop) {
                  pushTextRun()
                  styleStack.underline.pop()
                }
              }

              // 处理其他标签结束
              switch (tagName) {
                case "strong":
                case "b":
                  pushTextRun()
                  if (styleStack.bold.length > 0) {
                    styleStack.bold.pop()
                  }
                  break
                case "em":
                case "i":
                  pushTextRun()
                  if (styleStack.italic.length > 0) {
                    styleStack.italic.pop()
                  }
                  break
                case "span":
                  if (styleStack.fontSize !== null) {
                    pushTextRun()
                    styleStack.fontSize = null
                  }
                  break
              }
            }
          }

          // 开始处理根节点
          processNode(node)
        }

        const pushTextRun = () => {
          if (currentText) {
            textRuns.push(
              new window.docx.TextRun({
                text: currentText,
                bold: styleStack.bold.length > 0,
                italic: styleStack.italic.length > 0,
                underline:
                  styleStack.underline.length > 0
                    ? {
                        type: "single",
                        color: "000000",
                      }
                    : undefined,
                size: styleStack.fontSize || 22,
              }),
            )
            currentText = ""
          }
        }

        // 解析原始HTML
        const rawHTML = contentCell?.h || contentCell?.value || ""
        const parser = new DOMParser()
        const doc = parser.parseFromString(
          `<style>
          u, .underline { text-decoration: underline; }
          span[style*="font-size"] { font-size: inherit; }
        </style><div>${rawHTML}</div>`,
          "text/html",
        )
        walkNodes(doc.body.firstChild)
        pushTextRun()

        return {
          code: codeCell.value || "未命名条款",
          contentRuns: textRuns,
        }
      }

      // 文档生成模块
      const generateDocument = async (column, suffix) => {
        const items = Array.from(state.selectedClauses)
          .map((index) => {
            const row = state.allData[Number.parseInt(index) + 1]
            return row ? parseContent(row, column) : null
          })
          .filter(Boolean)

        if (items.length === 0) return

        const doc = new window.docx.Document({
          styles: baseStyle,
          sections: [
            {
              properties: {
                page: {
                  margin: {
                    top: 1000,
                    right: 1800,
                    bottom: 1000,
                    left: 1800,
                  },
                },
              },
              children: items.flatMap((item, i) => [
                new window.docx.Paragraph({
                  children: [
                    new window.docx.TextRun({
                      text: `${i + 1}. ${item.code} - `,
                      bold: true,
                      size: 22,
                      break: 0,
                    }),
                    ...item.contentRuns,
                  ],
                  spacing: { after: 400 },
                }),
                new window.docx.Paragraph({
                  border: { bottom: { size: 6, color: "DDDDDD" } },
                }),
              ]),
            },
          ],
        })

        const blob = await window.docx.Packer.toBlob(doc)
        saveAs(blob, `条款导出_${timestamp}${suffix}.docx`)
      }

      // 执行导出
      if (state.currentMode === "bilingual") {
        await Promise.all([
          generateDocument(modeConfig.columns[0], modeConfig.suffixes[0]),
          generateDocument(modeConfig.columns[1], modeConfig.suffixes[1]),
        ])
      } else {
        await generateDocument(modeConfig.columns[0], modeConfig.suffixes[0])
      }

      showNotification("导出成功", "success")
    } catch (error) {
      console.error("导出失败:", error)
      showNotification(`导出失败: ${error.message}`, "error")
    } finally {
      elements.exportBtn.disabled = false
      elements.exportBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      导出DOCX
    `
    }
  }

  // 导出已保存的条款包
  const handleExportPackages = () => {
    if (state.savedPackages.size === 0) {
      showNotification("暂无已保存的条款包可导出", "error")
      return
    }
    console.log("[导出调试] 开始导出条款包，总数:", state.savedPackages.size)

    const wb = XLSX.utils.book_new()

    // 创建汇总表
    const mainWsData = [["条款包名称", "保存时间", "条款数", "备注"]]
    Array.from(state.savedPackages).forEach(([id, pkg]) => {
      mainWsData.push([pkg.name, pkg.timestamp, pkg.count, pkg.remark])
    })
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(mainWsData), "汇总")

    // 生成条款包明细表
    Array.from(state.savedPackages).forEach(([id, pkg]) => {
      console.log("[导出调试] 正在处理条款包:", pkg.name, "包含条款数:", pkg.clauses.size)
      const wsData = [
        ["条款包名称", pkg.name],
        ["保存时间", pkg.timestamp],
        ["条款数", pkg.count],
        ["备注", pkg.remark],
        [],
        ["条款编码", "条款名称", "产品类别", "累计赔偿限额", "每次赔偿限额", "免赔额", "备注"],
      ]

      const limitsMap = new Map(pkg.limits)
      console.log("LIMITS MAP ENTRIES:", Array.from(limitsMap.entries())) // 调试用

      Array.from(pkg.clauses).forEach((clauseCode) => {
        const rowIndex = state.codeRowMap.get(clauseCode)

        if (typeof rowIndex === "undefined") {
          console.error("[导出错误] 无效的条款编码:", clauseCode)
          return
        }

        const clause = state.allData[rowIndex]
        // 改用数组查找替代Map.get()
        const limitData = limitsMap.get(clauseCode) || {}

        wsData.push([
          clauseCode, // 直接使用存储的编码
          clause[state.headerMap.get("名称")]?.value || "无",
          clause[state.headerMap.get("产品类别")]?.value || "无",
          limitData.total || "", // 累计赔偿限额
          limitData.perOccurrence || "", // 每次赔偿限额
          limitData.deductible || "", // 免赔额
          limitData.remark || "", // 限额备注
        ])
      })

      const ws = XLSX.utils.aoa_to_sheet(wsData)
      XLSX.utils.book_append_sheet(wb, ws, pkg.name.substring(0, 31))
    })

    // 确保只生成一次文件
    const fileName = `条款包汇总_${new Date().toISOString().slice(0, 16).replace(/[-T]/g, "")}.xlsx`
    XLSX.writeFile(wb, fileName) // 唯一文件写入点
    console.log("[导出调试] 导出完成，文件名:", fileName)

    // 添加成功通知
    showNotification("条款包导出成功！", "success", `已导出到文件: ${fileName}`)
  }

  // 重置所有
  const handleReset = () => {
    if (!confirm("确定要重置所有信息吗？这将清除所有填写的报价信息和选择的条款，但保留已上传的Excel文件。")) return

    // 重置搜索相关状态
    elements.searchInput.value = ""
    state.currentPage = 1
    state.totalPages = 1
    state.selectedClauses.clear()

    // 重置搜索结果表格
    elements.resultsBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 32px; color: var(--muted-foreground)">
                    ${state.fileLoaded ? "请输入搜索条件" : "请先上传文件并进行搜索"}
                </td>
            </tr>
        `

    // 更新预览按钮状态
    updateSelectionUI()

    // 重置基本信息表单
    document.getElementById("underwriter-name").value = ""
    document.getElementById("underwriter-email").value = ""
    document.getElementById("underwriter-phone").value = ""
    document.getElementById("policy-holder").value = ""

    // 火险报价字段重置
    document.getElementById("fire-insurance-type").value = "Property All Risks"

    // 重置被保险人名称 - 保留第一行，删除其他行
    const insuredNamesContainer = document.getElementById("insured-names-container")
    if (insuredNamesContainer) {
      const firstNameRow = insuredNamesContainer.querySelector(".dual-language-input")
      if (firstNameRow) {
        // 清空第一行的输入值
        const cnInput = firstNameRow.querySelector(".insured-name-cn")
        const enInput = firstNameRow.querySelector(".insured-name-en")
        if (cnInput) cnInput.value = ""
        if (enInput) enInput.value = ""

        // 删除其他所有行
        Array.from(insuredNamesContainer.querySelectorAll(".dual-language-input"))
          .slice(1)
          .forEach((row) => row.remove())
      }
    }

    // 重置被保险人地址 - 保留第一行，删除其他行
    const insuredAddressesContainer = document.getElementById("insured-addresses-container")
    if (insuredAddressesContainer) {
      const firstAddressRow = insuredAddressesContainer.querySelector(".dual-language-input")
      if (firstAddressRow) {
        // 清空第一行的输入值
        const cnInput = firstAddressRow.querySelector(".insured-address-cn")
        const enInput = firstAddressRow.querySelector(".insured-address-en")
        if (cnInput) cnInput.value = ""
        if (enInput) enInput.value = ""

        // 删除其他所有行
        Array.from(insuredAddressesContainer.querySelectorAll(".dual-language-input"))
          .slice(1)
          .forEach((row) => row.remove())
      }
    }

    // 重置承保场所地址 - 保留第一行，删除其他行
    const insuredLocationsContainer = document.getElementById("insured-locations-container")
    if (insuredLocationsContainer) {
      const firstLocationRow = insuredLocationsContainer.querySelector(".dual-language-input")
      if (firstLocationRow) {
        // 清空第一行的输入值
        const cnInput = firstLocationRow.querySelector(".insured-location-cn")
        const enInput = firstLocationRow.querySelector(".insured-location-en")
        if (cnInput) cnInput.value = ""
        if (enInput) enInput.value = ""

        // 删除其他所有行
        Array.from(insuredLocationsContainer.querySelectorAll(".dual-language-input"))
          .slice(1)
          .forEach((row) => row.remove())
      }
    }

    // 重置营业性质描述
    document.getElementById("business-description-cn").value = ""
    document.getElementById("business-description-en").value = ""

    // 重置保险期间和报价有效期
    document.getElementById("fire-insurance-start-date").value = ""
    document.getElementById("fire-insurance-end-date").value = ""

    // 设置报价有效期为当前日期后30天
    const today = new Date()
    const defaultValidDate = new Date(today)
    defaultValidDate.setDate(today.getDate() + 30)
    const year = defaultValidDate.getFullYear()
    const month = String(defaultValidDate.getMonth() + 1).padStart(2, "0")
    const day = String(defaultValidDate.getDate()).padStart(2, "0")
    document.getElementById("fire-quote-valid-until").value = `${year}-${month}-${day}`

    // 重置费率和保费
    document.getElementById("fire-premium-rate").value = ""
    document.getElementById("fire-premium-amount").value = ""

    // 重置模板上传
    document.getElementById("template-upload").value = ""
    state.currentTemplate = null
    document.getElementById("template-filename").textContent = "模板尚未选中"
    document.getElementById("template-size").textContent = ""
    document.getElementById("template-status").textContent = ""

    // 重置选项卡
    document.querySelectorAll(".quote-tab").forEach((tab) => {
      tab.classList.remove("active")
      if (tab.dataset.tab === "basic") {
        tab.classList.add("active")
      }
    })

    document.querySelectorAll(".panel-content").forEach((panel) => {
      panel.classList.remove("active")
      if (panel.dataset.panel === "basic") {
        panel.classList.add("active")
      }
    })

    // 重置语言模式
    document.getElementById("language-mode").value = "chinese"
    state.currentMode = "chinese"

    // 清空限额
    state.limitValues.clear()
    state.dynamicLimits.clear()

    // 移除所有包的激活状态
    document.querySelectorAll(".package-item").forEach((item) => {
      item.classList.remove("active")
    })

    // 重置自定义下拉框
    if (window.initializeAllDropdowns) {
      setTimeout(() => {
        window.initializeAllDropdowns()
      }, 100)
    }

    showNotification("已重置所有信息", "success")
  }

  // 显示模态窗口
  const showModal = (modal) => {
    if (!modal || !elements.modalBackdrop) return

    // 获取当前显示的模态窗口
    const visibleModals = document.querySelectorAll(".modal.show")

    // 计算新模态窗口应该使用的z-index
    // 基础z-index值
    const baseZIndex = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue("--z-modal"))

    // 如果有其他显示的模态窗口，将它们隐藏
    visibleModals.forEach((m) => {
      if (m !== modal) {
        m.classList.remove("show")
        m.style.display = "none"
      }
    })

    // 设置背景层级
    const backdropZIndex = Number.parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--z-modal-backdrop"),
    )
    elements.modalBackdrop.style.zIndex = backdropZIndex

    // 设置模态窗口层级 - 确保它高于背景
    modal.style.zIndex = baseZIndex

    // 特殊处理报价面板 - 确保它始终在最上层
    if (modal.id === "quote-panel") {
      modal.style.zIndex = baseZIndex + 10

      // 添加这行代码，确保报价面板在显示时有正确的尺寸
      document.body.classList.add("quote-panel-open")
    }

    // 显示背景和模态窗口
    elements.modalBackdrop.style.display = "flex"
    modal.style.display = "flex"

    // 使用requestAnimationFrame确保DOM更新后再添加show类
    requestAnimationFrame(() => {
      elements.modalBackdrop.classList.add("show")
      modal.classList.add("show")
    })
  }

  // 修改hideModal函数，确保正确清理z-index
  const hideModal = (modal) => {
    if (!modal || !elements.modalBackdrop) return

    // 检查是否还有其他显示的模态窗口
    const visibleModals = Array.from(document.querySelectorAll(".modal.show")).filter((m) => m !== modal)

    // 移除当前模态窗口的show类
    modal.classList.remove("show")

    // 如果关闭的是报价面板，移除body上的类
    if (modal.id === "quote-panel") {
      document.body.classList.remove("quote-panel-open")
    }

    // 如果没有其他显示的模态窗口，也隐藏背景
    if (visibleModals.length === 0) {
      elements.modalBackdrop.classList.remove("show")
    }

    // 使用setTimeout确保过渡动画完成后再隐藏元素
    setTimeout(() => {
      modal.style.display = "none"

      // 如果没有其他显示的模态窗口，也隐藏背景
      if (visibleModals.length === 0 && elements.modalBackdrop) {
        elements.modalBackdrop.style.display = "none"
      }

      // 重置表格的z-index，确保在模态窗口关闭后表格可见性恢复
      if (elements.resultsTable) {
        elements.resultsTable.style.zIndex = getComputedStyle(document.documentElement).getPropertyValue("--z-table")
      }

      // 移除这段代码，不要设置非活动面板的z-index为-1
      /*
    document.querySelectorAll(".panel-content").forEach((panel) => {
      if (!panel.classList.contains("active")) {
        panel.style.zIndex = "-1"; // 确保非活动面板不会阻挡点击
      }
    });
    */

      // 新增：确保上传区域始终可点击
      const uploadArea = document.getElementById("upload-area")
      if (uploadArea) {
        uploadArea.style.position = "relative"
        uploadArea.style.zIndex = "5" // 确保上传区域有足够高的z-index
      }

      // 新增：重置所有模态相关元素的层级
      document.querySelectorAll(".modal").forEach((m) => {
        if (!m.classList.contains("show")) {
          m.style.zIndex = "-1"
        }
      })
    }, 300)
  }



  // 读取文件内容
  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = (e) => reject(e)
      reader.readAsArrayBuffer(file)
    })
  }

  // 安全获取单元格
  const safeGetCell = (row, key) => {
    const index = state.headerMap.get(key)
    return row[index] || { value: "" }
  }

  // 修改 performSearch 函数，添加对搜索列的支持
  const performSearch = (resetPage) => {
    if (!state.fileLoaded) {
      showNotification("请先上传文件", "error")
      return
    }

    if (resetPage) state.currentPage = 1

    const searchTerm = elements.searchInput.value.trim()
    const searchRegex = searchTerm ? new RegExp(searchTerm, "i") : null

    // 获取选择的搜索列
    const searchColumnSelect = document.getElementById("search-column")
    const searchColumnValue = searchColumnSelect ? searchColumnSelect.value : "0"

    // 根据选择的值确定要搜索的列
    let searchColumns = []
    switch (searchColumnValue) {
      case "1": // 中文名称
        searchColumns = ["名称"]
        break
      case "2": // 中文措辞
        searchColumns = ["中文产品工厂措辞"]
        break
      case "3": // 英文名称
        searchColumns = ["英文名称"]
        break
      case "4": // 英文措辞
        searchColumns = ["条款英文措辞"]
        break
      default: // 全部内容
        searchColumns = [] // 空数组表示搜索所有列
    }

    const results = state.allData
      .slice(1)
      .map((data, index) => ({ index, data }))
      .filter(({ data }) => {
        if (!searchRegex) return true

        // 如果没有指定搜索列，则搜索所有列
        if (searchColumns.length === 0) {
          for (const cell of data) {
            if (cell && cell.value && searchRegex.test(cell.value)) {
              return true
            }
          }
          return false
        }

        // 否则只搜索指定的列
        return searchColumns.some((column) => {
          const columnIndex = state.headerMap.get(column)
          if (columnIndex === undefined) return false

          const cell = data[columnIndex]
          return cell && cell.value && searchRegex.test(cell.value)
        })
      })
      .map(({ index, data }) => ({
        index,
        data,
        searchTerm,
      }))

    updatePaginationState(results.length)
    renderResults(results)
    renderPaginationControls()
  }

  function getSelectedClausesInfo() {
    const clausesInfo = []
    const state = FinancialClauseEngine.state
    // 获取当前语言模式
    const currentMode = state.currentMode || "chinese"

    // 遍历所有选中的条款
    Array.from(state.selectedClauses).forEach((index, idx) => {
      const row = state.allData[Number.parseInt(index) + 1]
      if (!row) return

      const codeCell = safeGetCell(row, "条款编码")
      const nameCell = safeGetCell(row, "名称")
      const englishNameCell = safeGetCell(row, "英文名称")
      const categoryCell = safeGetCell(row, "产品类别")
      const contentCell = safeGetCell(row, "中文产品工厂措辞")
      const englishContentCell = safeGetCell(row, "条款英文措辞")

      // 获取限额信息
      const clauseCode = codeCell.value
      const limits = state.limitValues.get(clauseCode) || {}

      // 判断是否有限额和备注
      const hasLimits = limits.total || limits.perOccurrence || limits.deductible
      const hasRemark = limits.remark && limits.remark.trim() !== ""

      // 根据语言模式格式化限额和备注
      let displayName,
        displayLimits = "",
        displayRemark = ""

      if (currentMode === "english") {
        displayName = englishNameCell.value || nameCell.value

        if (hasLimits) {
          const limitParts = []
          if (limits.total) limitParts.push(`In Aggregate: ${limits.total}`)
          if (limits.perOccurrence) limitParts.push(`Each Occurrence: ${limits.perOccurrence}`)
          if (limits.deductible) limitParts.push(`Deductible: ${limits.deductible}`)
          displayLimits = limitParts.join("; ")
        }

        if (hasRemark) {
          displayRemark = `Remark: ${limits.remark}`
        }
      } else if (currentMode === "bilingual") {
        displayName = `${englishNameCell.value || ""} ${nameCell.value || ""}`

        if (hasLimits) {
          const limitParts = []
          if (limits.total) limitParts.push(`In Aggregate 累计限额: ${limits.total}`)
          if (limits.perOccurrence) limitParts.push(`Each Occurrence 每次限额: ${limits.perOccurrence}`)
          if (limits.deductible) limitParts.push(`Deductible 免赔额: ${limits.deductible}`)
          displayLimits = limitParts.join("; ")
        }

        if (hasRemark) {
          displayRemark = `Remark 备注: ${limits.remark}`
        }
      } else {
        // 默认中文
        displayName = nameCell.value || englishNameCell.value

        if (hasLimits) {
          const limitParts = []
          if (limits.total) limitParts.push(`累计限额: ${limits.total}`)
          if (limits.perOccurrence) limitParts.push(`每次限额: ${limits.perOccurrence}`)
          if (limits.deductible) limitParts.push(`免赔额: ${limits.deductible}`)
          displayLimits = limitParts.join("; ")
        }

        if (hasRemark) {
          displayRemark = `备注: ${limits.remark}`
        }
      }

      // 构建完整的条款显示格式
      let formattedItem = `${idx + 1}. ${clauseCode} - ${displayName}`
      if (hasLimits) {
        formattedItem += ` (${displayLimits})`
      }
      if (hasRemark) {
        formattedItem += ` (${displayRemark})`
      }

      // 将条款信息添加到数组中
      clausesInfo.push({
        item: formattedItem,
        code: clauseCode,
        name: nameCell.value || "",
        englishName: englishNameCell.value || "",
        category: categoryCell.value || "",
        content: contentCell.value || "",
        englishContent: englishContentCell.value || "",
        totalLimit: limits.total || "",
        perOccurrenceLimit: limits.perOccurrence || "",
        deductible: limits.deductible || "",
        remark: limits.remark || "",
        hasLimits: hasLimits,
        hasRemark: hasRemark,
        displayName: displayName,
        displayLimits: displayLimits,
        displayRemark: displayRemark,
        index: idx + 1,
      })
    })

    return {
      items: clausesInfo,
      count: clausesInfo.length,
      // 添加条款列表字符串，方便模板使用
      listChinese: clausesInfo.map((item) => item.item).join("\n"),
      listEnglish: clausesInfo.map((item) => item.item).join("\n"),
      clauses: clausesInfo, // 添加clauses数组，用于循环渲染
    }
  }

  // 修改 formatQuoteData 函数，确保它包含 getSelectedClausesInfo 的结果
  function formatQuoteData(basicData, fireData) {
    // 保留原有的格式化代码...

    // 格式化被保险人名称列表
    const insuredNamesList = {
      // 数组形式，用于循环渲染
      insuredNamesCn: fireData.insuredNames.map((item) => item.cn).filter(Boolean),
      insuredNamesEn: fireData.insuredNames.map((item) => item.en).filter(Boolean),

      // 字符串形式，用于直接替换
      insuredNamesCnString: fireData.insuredNames
        .map((item) => item.cn)
        .filter(Boolean)
        .join("、"),
      insuredNamesEnString: fireData.insuredNames
        .map((item) => item.en)
        .filter(Boolean)
        .join(", "),

      // 添加对象数组形式，用于高级模板
      insuredNames: fireData.insuredNames
        .filter((item) => item.cn || item.en) // 过滤掉空的项
        .map((item, index) => ({
          index: index + 1,
          cn: item.cn || "",
          en: item.en || "",
          isLast: false, // 稍后会更新这个值
          // 添加格式化的显示字段
          formattedDisplay: `${index + 1}、${item.en || ""}\n${item.cn || ""}`,
        })),

      // 添加新的格式化字段，用于整体显示
      formattedInsuredNames: fireData.insuredNames
        .filter((item) => item.cn || item.en)
        .map((item, index) => `${index + 1}、${item.en || ""}\n${item.cn || ""}`)
        .join("\n\n"),
    }

    if (insuredNamesList.insuredNames.length > 0) {
      insuredNamesList.insuredNames[insuredNamesList.insuredNames.length - 1].isLast = true
    }

    // 格式化被保险人地址列表
    const insuredAddressesList = {
      insuredAddressesCn: fireData.insuredAddresses.map((item) => item.cn).filter(Boolean),
      insuredAddressesEn: fireData.insuredAddresses.map((item) => item.en).filter(Boolean),
      // 合并为单个字符串
      insuredAddressesCnString: fireData.insuredAddresses
        .map((item) => item.cn)
        .filter(Boolean)
        .join("；"),
      insuredAddressesEnString: fireData.insuredAddresses
        .map((item) => item.en)
        .filter(Boolean)
        .join("; "),

      // 添加对象数组形式，用于高级模板
      insuredAddresses: fireData.insuredAddresses
        .filter((item) => item.cn || item.en) // 过滤掉空的项
        .map((item, index) => ({
          index: index + 1,
          cn: item.cn || "",
          en: item.en || "",
          isLast: false, // 稍后会更新这个值
          // 添加格式化的显示字段
          formattedDisplay: `${index + 1}、${item.en || ""}\n${item.cn || ""}`,
        })),

      // 添加新的格式化字段，用于整体显示
      formattedInsuredAddresses: fireData.insuredAddresses
        .filter((item) => item.cn || item.en)
        .map((item, index) => `${index + 1}、${item.en || ""}\n${item.cn || ""}`)
        .join("\n\n"),
    }

    // 格式化承保场所地址列表
    const insuredLocationsList = {
  insuredLocationsCn: fireData.insuredLocations.map((item) => item.cn).filter(Boolean),
  insuredLocationsEn: fireData.insuredLocations.map((item) => item.en).filter(Boolean),
  
  insuredLocationsCnString: fireData.insuredLocations.map((item) => item.cn).filter(Boolean).join("；"),
  insuredLocationsEnString: fireData.insuredLocations.map((item) => item.en).filter(Boolean).join("; "),
  
  // 修复1: 使用正确的变量名 insuredLocations (复数)
  insuredLocations: fireData.insuredLocations.filter((item) => item.cn || item.en)
    .map((item, index) => ({
      index: index + 1,
      cn: item.cn || "",
      en: item.en || "",
      isLast: false,
      formattedDisplay: `${index + 1}、${item.en || ""}\n${item.cn || ""}`,
    })),
  
  // 修复2: 使用正确的变量名 formattedInsuredLocations (复数)
  formattedInsuredLocations: fireData.insuredLocations.filter((item) => item.cn || item.en)
    .map((item, index) => `${index + 1}、${item.en || ""}\n${item.cn || ""}`)
    .join("\n\n"),
}

    // 修改 formatQuoteData 函数中的保费和费率处理部分
    // 找到这段代码：
    const premium = {
      rate: fireData.premiumRate ? Number.parseFloat(fireData.premiumRate).toFixed(4) + "%" : "",
      amount: fireData.premiumAmount ? formatCurrency(fireData.premiumAmount) : "",
      // 不带格式的原始值，用于计算
      rateRaw: fireData.premiumRate ? Number.parseFloat(fireData.premiumRate) : 0,
      amountRaw: fireData.premiumAmount ? Number.parseFloat(fireData.premiumAmount.replace(/,/g, "")) : 0,
    }

    // 替换为：
    const premiumValue = {
      rate: fireData.premiumRate ? Number.parseFloat(fireData.premiumRate).toFixed(4) + "%" : "",
      amount: fireData.premiumAmount ? formatCurrency(fireData.premiumAmount) : "",
      // 不带格式的原始值，用于计算
      rateRaw: fireData.premiumRate ? Number.parseFloat(fireData.premiumRate) : 0,
      amountRaw: fireData.premiumAmount ? Number.parseFloat(fireData.premiumAmount.replace(/,/g, "")) : 0,
    }

    // 返回格式化后的完整数据
    // 返回格���化后的完整数据
    return {
      // 基础信息
      ...basicData,

      // 保险类型
      insuranceType: fireData.insuranceType || "",
      insuranceTypeCn: translateInsuranceType(fireData.insuranceType) || fireData.insuranceType || "",
      insuranceTypeEn: translateInsuranceType(fireData.insuranceType, true) || fireData.insuranceType || "",

      // 被保险人信息
      ...insuredNamesList,
      ...insuredAddressesList,
      ...insuredLocationsList,

      // 营业性质描述
      businessDescriptionCn: fireData.businessDescription.cn || "",
      businessDescriptionEn: fireData.businessDescription.en || "",

      // 保险期间 - 同时提供对象和直接属性
      insurancePeriod: {
        start: fireData.insurancePeriod.start ? formatDateYMD(new Date(fireData.insurancePeriod.start)) : "",
        end: fireData.insurancePeriod.end ? formatDateYMD(new Date(fireData.insurancePeriod.end)) : "",
        startDate: fireData.insurancePeriod.start ? formatDateYMD(new Date(fireData.insurancePeriod.start)) : "",
        endDate: fireData.insurancePeriod.end ? formatDateYMD(new Date(fireData.insurancePeriod.end)) : "",
        periodCn:
          fireData.insurancePeriod.start && fireData.insurancePeriod.end
            ? `12个月，自${formatDateChinese(new Date(fireData.insurancePeriod.start))} 00:00 至${formatDateChinese(new Date(fireData.insurancePeriod.end))} 24:00`
            : "",
        periodEn:
          fireData.insurancePeriod.start && fireData.insurancePeriod.end
            ? `12 Months, From ${formatDateEnglish(new Date(fireData.insurancePeriod.start))} 00:00 to ${formatDateEnglish(new Date(fireData.insurancePeriod.end))} 24:00`
            : "",
      },
      insurancePeriodCn:
        fireData.insurancePeriod.start && fireData.insurancePeriod.end
          ? `12个月，自${formatDateChinese(new Date(fireData.insurancePeriod.start))} 00:00 至${formatDateChinese(new Date(fireData.insurancePeriod.end))} 24:00`
          : "",
      insurancePeriodEn:
        fireData.insurancePeriod.start && fireData.insurancePeriod.end
          ? `12 Months, From ${formatDateEnglish(new Date(fireData.insurancePeriod.start))} 00:00 to ${formatDateEnglish(new Date(fireData.insurancePeriod.end))} 24:00`
          : "",

      // 报价有效期 - 提供字符串和对象两种形式
      quoteValidUntil: fireData.quoteValidUntil ? formatDateYMD(new Date(fireData.quoteValidUntil)) : "",
      quoteValidUntilObj: {
        date: fireData.quoteValidUntil ? formatDateYMD(new Date(fireData.quoteValidUntil)) : "",
        dateCn: fireData.quoteValidUntil ? formatDateChinese(new Date(fireData.quoteValidUntil)) : "",
        dateEn: fireData.quoteValidUntil ? formatDateEnglish(new Date(fireData.quoteValidUntil)) : "",
      },

      // 保费和费率
      premium: premiumValue,
      premiumRate: premiumValue.rate || " ",
      premiumAmount: premiumValue.amount || " ",
    }
  }

  // 创建增强版的报价生成流程
function enhancedQuoteGeneration() {
  // 显示加载动画
  showLoadingAnimation("确认被保险人基本信息...");
  
  // 定义阶段信息和时间点
  const stages = [
    { message: "确认被保险人基本信息...", progress: 10, time: 500 },
    { message: "确定所选中条款及相关限额备注...", progress: 40, time: 1000 },
    { message: "正在整合全部报价信息...", progress: 60, time: 1500 },
    { message: "正在生成报价....", progress: 90, time: 2000 },
    { message: "即将完成...", progress: 95, time: 2500 },
    { message: "报价单生成成功！", progress: 100, time: 3000 }
  ];
  
  // 创建平滑动画
  let currentStage = 0;
  
  // 使用requestAnimationFrame创建平滑过渡
  function animateProgress(startProgress, endProgress, startTime, duration, message) {
    return new Promise(resolve => {
      function animate(currentTime) {
        const elapsed = currentTime - startTime;
        if (elapsed >= duration) {
          updateLoadingProgress(endProgress, message);

          // 添加这行确保最终状态也是从左到右
        const progressBar = document.getElementById('loading-progress-bar');
        if (progressBar) {
          progressBar.style.left = '0';
          progressBar.style.right = 'auto';
        }

          resolve();
          return;
        }
        
        const progress = startProgress + (endProgress - startProgress) * (elapsed / duration);

        // 直接设置进度条样式，而不是调用updateLoadingProgress
      const progressBar = document.getElementById('loading-progress-bar');
      if (progressBar) {
        progressBar.style.width = `${Math.floor(progress)}%`;
        progressBar.style.left = '0';
        progressBar.style.right = 'auto';
        
        // 仍然更新消息
        const loadingText = document.getElementById("loading-text");
        if (message && loadingText) loadingText.textContent = message;
      } else {
        // 如果找不到进度条元素，回退到使用updateLoadingProgress
        updateLoadingProgress(Math.floor(progress), message);
      }
        requestAnimationFrame(animate);
      }
      
      requestAnimationFrame(function(timestamp) {
        animate(timestamp);
      });
    });
  }
  
  // 执行阶段动画序列
  let lastProgress = 0;
  let chain = Promise.resolve();
  
  stages.forEach((stage, index) => {
    const nextStage = stages[index + 1];
    if (!nextStage) return;
    
    const duration = nextStage.time - stage.time;
    
    chain = chain.then(() => {
      return animateProgress(stage.progress, nextStage.progress, performance.now(), duration, stage.message);
    });
  });
  
  // 完成所有动画后，触发烟花并生成文档
  chain.then(() => {
    // 触发烟花效果
    if (window.confetti) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        zIndex: 2000,
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
        startVelocity: 30,
        gravity: 0.8,
        shapes: ['circle', 'square'],
        ticks: 200
      });
    }
    
    // 短暂延迟后隐藏加载动画并生成文档
    setTimeout(() => {
      hideLoadingAnimation();
      // 实际生成文档
      generateQuoteDocument(true); // 传入true表示跳过加载动画
    }, 300);
  });
}

  function generateQuoteDocument(skipAnimation = false) {
  // 如果不跳过动画，��直接返回（因为实际生成会在动画完成后调用）
  if (!skipAnimation) {
    enhancedQuoteGeneration();
    return;
  }
  
  try {
    // 原有的文档生成代码...
    // 1. 检查是否上传了模板
    const templateFile = FinancialClauseEngine.state.currentTemplate;

    // 2. 收集基础信息表单数据
    const basicData = collectBasicData();

    // 3. 收集火险报价数据
    const fireData = window.collectFireQuoteData();

    // 4. 格式化数据
    const formattedData = formatQuoteData(basicData, fireData);

    // 5. 获取选中的条款信息
    const selectedClausesInfo = getSelectedClausesInfo();

    // 6. 合并所有数据
    const allData = {
      ...formattedData,
      // 添加日期格式化
      currentDate: formatDateYMD(new Date()),
      // 添加选中的条款信息
      ...selectedClausesInfo,
    };

    // 7. 读取模板文件并处理
    const reader = new FileReader();
    reader.onload = (event) => {
      processTemplate(event.target.result, allData);
    };
    reader.onerror = (event) => {
      console.error("模板文件读取失败:", event);
      showNotification("模板文件读取失败", "error");
    };
    reader.readAsArrayBuffer(templateFile);
  } catch (error) {
    console.error("生成报价单时出错:", error);
    showNotification(`生成报价单失败: ${error.message}`, "error");
  }
}

// 修改triggerConfetti函数，将其与文档生成分离
window.triggerConfetti = () => {
// 检查是否已上传模板
  if (!FinancialClauseEngine.state.currentTemplate) {
    showNotification("请先上传报价单模板", "error");
    return;
  }
  // 调用增强版的报价生成流程
  enhancedQuoteGeneration();
};

  // 收集基本信息表单数据
  function collectBasicData() {
    return {
      underwriterName: document.getElementById("underwriter-name").value,
      underwriterEmail: document.getElementById("underwriter-email").value,
      underwriterPhone: document.getElementById("underwriter-phone").value,
      policyHolder: document.getElementById("policy-holder").value,
    }
  }

  function formatDateYMD(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  function formatDateChinese(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}年${month}月${day}日`
  }

  function formatDateEnglish(date) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const day = date.getDate()
    const monthIndex = date.getMonth()
    const year = date.getFullYear()
    return `${monthNames[monthIndex]} ${day}, ${year}`
  }

  // 格式化货币
  function formatCurrency(amount) {
    return Number(amount).toLocaleString("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

// 修改后的函数应该类似这样
function translateInsuranceType(type, toEnglish = false) {
  const cnToEn = {
    "财产一切险": "Property All Risks",
    "财产基本险": "Fire Insurance Clauses",
    "财产综合险": "Property Insurance Clauses",
    "营业中断险": "Business Interruption Insurance",
    "现金保险": "Money Insurance",
    "机器损坏险": "Machinery Breakdown Insurance"
    // 添加更多翻译
  };
  
  const enToCn = {
    "Property All Risks": "财产一切险",
    "Fire Insurance Clauses": "财产基本险",
    "Property Insurance Clauses": "财产综合险",
    "Business Interruption Insurance": "营业中断险",
    "Money Insurance": "现金保险",
    "Machinery Breakdown Insurance": "机器损坏险"
    // 添加更多翻译
  };
  
  if (toEnglish) {
    return cnToEn[type] || type; // 中文转英文
  } else {
    return enToCn[type] || type; // 英文转中文
  }
}

  // 处理模板文件
  async function processTemplate(templateData, data) {
    try {
      if (!window.PizZip || !window.docxtemplater) {
        throw new Error("PizZip或Docxtemplater库未加载，无法生成文档")
      }

      updateLoadingProgress(70, "正在解压模板...")
      const zip = new PizZip(templateData)
      const doc = new docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      })

      updateLoadingProgress(80, "正在替换模板变量...")
      doc.render(data)

      updateLoadingProgress(90, "正在生成文档...")
      const out = doc.getZip().generate({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      })

      updateLoadingProgress(100, "文档生成完成！")
      saveAs(out, `报价单_${new Date().toISOString().slice(0, 16).replace(/[-T]/g, "")}.docx`)
      hideLoadingAnimation()
      showNotification("报价单生成成功！", "success")
      // 移除对 triggerConfetti 的调用，防止循环调用
    } catch (error) {
      console.error("处理模板文件时出错:", error)
      showNotification(`处理模板文件失败: ${error.message}`, "error")
      hideLoadingAnimation()
    }
  }

  // 收集火险报价数据
  window.collectFireQuoteData = () => {
    const insuredNames = []
    document.querySelectorAll("#insured-names-container .dual-language-input").forEach((row) => {
      insuredNames.push({
        cn: row.querySelector(".insured-name-cn").value,
        en: row.querySelector(".insured-name-en").value,
      })
    })

    const insuredAddresses = []
    document.querySelectorAll("#insured-addresses-container .dual-language-input").forEach((row) => {
      insuredAddresses.push({
        cn: row.querySelector(".insured-address-cn").value,
        en: row.querySelector(".insured-address-en").value,
      })
    })

    const insuredLocations = []
    document.querySelectorAll("#insured-locations-container .dual-language-input").forEach((row) => {
      insuredLocations.push({
        cn: row.querySelector(".insured-location-cn").value,
        en: row.querySelector(".insured-location-en").value,
      })
    })

    return {
      insuranceType: document.getElementById("fire-insurance-type").value,
      insuredNames: insuredNames,
      insuredAddresses: insuredAddresses,
      insuredLocations: insuredLocations,
      businessDescription: {
        cn: document.getElementById("business-description-cn").value,
        en: document.getElementById("business-description-en").value,
      },
      insurancePeriod: {
        start: document.getElementById("fire-insurance-start-date").value,
        end: document.getElementById("fire-insurance-end-date").value,
      },
      quoteValidUntil: document.getElementById("fire-quote-valid-until").value,
      premiumRate: document.getElementById("fire-premium-rate").value,
      premiumAmount: document.getElementById("fire-premium-amount").value,
    }
  }

  // 初始化
  const init = () => {
    initEventListeners()
    initLocalStorage()
  }

  return {
    init,
    performSearch,
    handleReset,
    state,
    getSelectedClausesInfo,
    showNotification
  }
})()

// 修改初始化火险报价面板的交互功能
const initFireQuotePanel = () => {
  // 使用类选择器和data-target属性来绑定事件
  document.querySelectorAll(".add-field-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target")
      const container = document.getElementById(targetId)
      if (!container) return

      const newRow = document.createElement("div")
      newRow.className = "dual-language-input"

      // 根据目标容器ID创建不同的输入字段
      if (targetId === "insured-names-container") {
        newRow.innerHTML = `
          <input type="text" placeholder="中文名称" class="insured-name-cn">
          <input type="text" placeholder="英文名称" class="insured-name-en">
          <button type="button" class="remove-field-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
            </svg>
          </button>
        `
      } else if (targetId === "insured-addresses-container") {
        newRow.innerHTML = `
          <input type="text" placeholder="中文地址" class="insured-address-cn">
          <input type="text" placeholder="英文地址" class="insured-address-en">
          <button type="button" class="remove-field-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
            </svg>
          </button>
        `
      } else if (targetId === "insured-locations-container") {
        newRow.innerHTML = `
          <input type="text" placeholder="中文地址" class="insured-location-cn">
          <input type="text" placeholder="英文地址" class="insured-location-en">
          <button type="button" class="remove-field-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
            </svg>
          </button>
        `
      }

      container.appendChild(newRow)

      // 为新添加的删除按钮添加事件监听
      newRow.querySelector(".remove-field-btn").addEventListener("click", () => {
        newRow.remove()
      })
    })
  })
  // 为已存在的删除按钮添加事件监听
  document.querySelectorAll(".remove-field-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".dual-language-input").remove()
    })
  })
  // 添加开始日期变化的事件监听器
  const startDateInput = document.getElementById("fire-insurance-start-date")
  const endDateInput = document.getElementById("fire-insurance-end-date")

  if (startDateInput && endDateInput) {
    startDateInput.addEventListener("change", () => {
      if (startDateInput.value) {
        // 计算结束日期（开始日期 + 364天 = 12个月）
        const startDate = new Date(startDateInput.value)
        const endDate = new Date(startDate)
        endDate.setDate(startDate.getDate() + 364) // 设置为364天后

        // 格式化为YYYY-MM-DD
        const year = endDate.getFullYear()
        const month = String(endDate.getMonth() + 1).padStart(2, "0")
        const day = String(endDate.getDate()).padStart(2, "0")

        endDateInput.value = `${year}-${month}-${day}`
      } else {
        endDateInput.value = ""
      }
    })
  }
}

// 初始化文件上传区域
const setupFileUpload = () => {
  const uploadArea = document.getElementById("upload-area")
  const fileInput = document.getElementById("file-input")

  if (uploadArea && fileInput) {
    uploadArea.addEventListener("click", () => {
      fileInput.click()
    })

    uploadArea.addEventListener("dragover", (e) => {
      e.preventDefault()
      uploadArea.classList.add("dragover")
    })

    uploadArea.addEventListener("dragleave", () => {
      uploadArea.classList.remove("dragover")
    })

    uploadArea.addEventListener("drop", (e) => {
      e.preventDefault()
      uploadArea.classList.remove("dragover")

      const files = e.dataTransfer.files
      if (files && files.length > 0) {
        fileInput.files = files
        const event = new Event("change", { bubbles: true })
        fileInput.dispatchEvent(event)
      }
    })
  }
}
