(function () {
  // Create the movable window
  const windowElement = document.createElement("div");
  windowElement.style.position = "fixed";
  windowElement.style.top = "20px";
  windowElement.style.right = "20px";
  windowElement.style.width = "400px";
  windowElement.style.backgroundColor = "#1e1e1e";
  windowElement.style.border = "1px solid #444";
  windowElement.style.borderRadius = "8px";
  windowElement.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3)";
  windowElement.style.color = "#fff";
  windowElement.style.fontFamily = "Arial, sans-serif";
  windowElement.style.zIndex = "10000";
  windowElement.style.display = "flex";
  windowElement.style.flexDirection = "column";
  windowElement.style.userSelect = "none";

  // Title bar
  const titleBar = document.createElement("div");
  titleBar.style.backgroundColor = "#333";
  titleBar.style.padding = "10px";
  titleBar.style.textAlign = "center";
  titleBar.style.fontWeight = "bold";
  titleBar.textContent = "GRIND YOUR FIND";
  windowElement.appendChild(titleBar);

  // Create main container
  const mainContainer = document.createElement("div");
  mainContainer.style.display = "flex";
  windowElement.appendChild(mainContainer);

  // Make the window draggable
  let isDragging = false;
  let offsetX, offsetY;

  titleBar.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - windowElement.getBoundingClientRect().left;
    offsetY = e.clientY - windowElement.getBoundingClientRect().top;
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      windowElement.style.left = `${e.clientX - offsetX}px`;
      windowElement.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Add navbar on the left
  const navbar = document.createElement("div");
  navbar.style.width = "80px";
  navbar.style.backgroundColor = "#2c2c2c";
  navbar.style.borderRight = "1px solid #444";
  navbar.style.borderRadius = "8px 0 0 8px";
  navbar.style.display = "flex";
  navbar.style.flexDirection = "column";
  navbar.style.alignItems = "center";
  navbar.style.paddingTop = "10px";
  mainContainer.appendChild(navbar);

  // Add tabs
  const tabs = ["Overview", "Stats", "Settings", "Exit"];
  const tabContent = document.createElement("div");
  tabContent.style.flex = "1";
  tabContent.style.padding = "10px";
  tabContent.style.overflowY = "auto";

  tabs.forEach((tab) => {
    const tabButton = document.createElement("button");
    tabButton.textContent = tab;
    tabButton.style.width = "70px";
    tabButton.style.padding = "8px";
    tabButton.style.marginBottom = "5px";
    tabButton.style.borderRadius = "4px";
    tabButton.style.border = "none";
    tabButton.style.backgroundColor = tab === "Exit" ? "#ff4444" : "#444";
    tabButton.style.color = "#fff";
    tabButton.style.cursor = "pointer";
    tabButton.style.fontWeight = "bold";
    tabButton.addEventListener("click", () => {
      if (tab === "Exit") {
        document.body.removeChild(windowElement);
        console.log("Grind Your Find window closed.");
      } else {
        tabContent.innerHTML = `<h3>${tab} Tab</h3>`;
        if (tab === "Stats") {
          tabContent.innerHTML += "<p>Stats will be displayed here.</p>";
        } else if (tab === "Settings") {
          tabContent.innerHTML += `
                        <p>Auto-Clicker Settings:</p>
                        <label for="interval">Interval (ms):</label>
                        <input type="number" id="interval" placeholder="e.g., 1000" style="width: 100%; padding: 5px; margin-bottom: 10px; border-radius: 4px; border: 1px solid #444; background-color: #333; color: #fff;">
                        <button id="startAutoClicker" style="width: 100%; padding: 8px; border-radius: 4px; border: none; background-color: #ffcc00; color: #1e1e1e; cursor: pointer; font-weight: bold;">Start Auto-Clicker</button>
                        <button id="stopAutoClicker" style="width: 100%; padding: 8px; margin-top: 5px; border-radius: 4px; border: none; background-color: #ff4444; color: #fff; cursor: pointer; font-weight: bold;">Stop Auto-Clicker</button>
                    `;
          setupAutoClicker();
        } else if (tab === "Overview") {
          tabContent.innerHTML += `
                        <p>Welcome to grind your find! To begin grinding, click the "Start" button.</p>
                        <button id="startAutoClicker" style="width: 100%; padding: 8px; border-radius: 4px; border: none; background-color: #ffcc00; color: #1e1e1e; cursor: pointer; font-weight: bold;">Start</button>
                        <button id="stopAutoClicker" style="width: 100%; padding: 8px; margin-top: 5px; border-radius: 4px; border: none; background-color: #ff4444; color: #fff; cursor: pointer; font-weight: bold;">Stop</button>
                    `;
          setupGuide();
        }
      }
    });
    navbar.appendChild(tabButton);
  });

  mainContainer.appendChild(tabContent);

  // Auto-clicker logic
  let intervalId = null;

  function setupAutoClicker() {
    const startButton = document.getElementById("startAutoClicker");
    const stopButton = document.getElementById("stopAutoClicker");
    const intervalInput = document.getElementById("interval");

    startButton.addEventListener("click", () => {
      const interval = parseInt(intervalInput.value.trim(), 10);

      if (isNaN(interval) || interval <= 0) {
        alert("Please enter a valid interval.");
        return;
      }

      intervalId = setInterval(() => {
        // NextNormal button
        const nextNormalButton = document.querySelector(
          "#root > div:nth-child(1) > div > div > div._templateNextButton_19ueu_1 > div > button"
        );
        if (nextNormalButton) {
          nextNormalButton.removeAttribute("disabled");
          nextNormalButton.click();
          console.log("Clicked NextNormal button.");
        }

        // NextChat button
        const nextChatButton = document.querySelector(
          "body > div._audioPlayer_4zwil_1._audioPlayerDesktop_4zwil_6 > div._resetButton_4zwil_57 > div > svg"
        );
        if (nextChatButton) {
          nextChatButton.closest("button")?.removeAttribute("disabled");
          nextChatButton.closest("button")?.click();
          console.log("Clicked NextChat button.");
        }
      }, interval);

      startButton.disabled = true;
      stopButton.disabled = false;
    });

    stopButton.addEventListener("click", () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      startButton.disabled = false;
      stopButton.disabled = true;
    });
  }

  // Add the window to the document
  document.body.appendChild(windowElement);

  console.log("Grind Your Find script loaded!");
})();
