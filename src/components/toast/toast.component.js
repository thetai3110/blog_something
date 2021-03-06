import './toast.component.css';
export const toast = ({ title = "", message = "", type = "info", duration = 3000 }) => {
    const main = document.getElementById("toast-custom");
    if (main) {
        const toast = document.createElement("div");
        // Auto remove toast
        const autoRemoveId = setTimeout(function () {
            main.removeChild(toast);
        }, duration + 1000);
        // Remove toast when clicked
        toast.onclick = function (e) {
            if (e.target.closest(".toast-custom-close")) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };
        const icons = {
            success: "fa fa-check-circle",
            info: "fa fa-info-circle",
            warning: "fa fa-exclamation-circle",
            error: "fa fa-exclamation-circle"
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);
        toast.classList.add("toast-custom", `toast-custom-${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
        toast.innerHTML = `
                      <div class="toast-custom-icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast-custom-body">
                          <h3 class="toast-custom-title">${title}</h3>
                          <p class="toast-custom-msg">${message}</p>
                      </div>
                      <div class="toast-custom-close">
                          <i class="fa fa-times"></i>
                      </div>
                  `;
        main.appendChild(toast);
    }
}
