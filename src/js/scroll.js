const scroll = document.querySelector(".scroll_top")

window.addEventListener("scroll", function () {
    scroll.classList.toggle("active", window.scrollY > 500)
})
export function scrollTopTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
}

scroll.addEventListener("click", scrollTopTop)