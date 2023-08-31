const inputText = document.querySelector(".input-text");
const searchBtn = document.querySelector(".icon-search");
const obatContainer = document.querySelector(".obat-container");
const loader = document.querySelector(".loader");

inputText.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        search();
    }
});

const search = async () => {
    const sickName = inputText.value;
    loader.style.display = "block";
    const obats = await getObat(sickName);

    if (obats.length === 0) {
        showAlert(
            "error",
            `Mohon Maaf, Kami belum ada rekomendasi obat untuk sakit ${sickName}🙏🏻`
        );
    } else if (
        sickName === "batuk" ||
        sickName === "flu" ||
        sickName === "pilek"
    ) {
        showAlert(
            "info",
            `ES TEROSS, Semoga ${sickName}nya cepat sembuhh yaa!!❤️‍🩹, jangan lupa diminum obatnyaa(khusus nasywa)`
        );
    } else {
        showAlert("info", `Semoga ${sickName}nya cepat sembuhh ya!!❤️‍🩹`);
    }

    loader.style.display = "none";
    updateUI(obats);
};

searchBtn.addEventListener("click", search);

const getObat = async (sickName) => {
    loader.style.display = "block";

    try {
        const result = await fetch(
            `https://tr.deployers.repl.co/cariobat?obat=${sickName}`
        );

        const data = await result.json();
        loader.style.display = "none";

        return data;
    } catch (e) {
        console.error("Error", e);
    }
};

const updateUI = (obat) => {
    let cards = "";
    obat.forEach((o) => (cards += showCards(o)));
    obatContainer.innerHTML = cards;
};

const showCards = (obat) => {
    return `<div class="col-md-3 mt-5 mb-3 show-cards">
                <div class="card">
                    <img src="${obat.fallback_url}"  alt="" class="card-img-top" />
                    <div class="card-body">
                        <h5 class="card-title">${obat.alt}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${obat.harga}</h6>
                        <a href="${obat.sumber}" class="btn btn-primary">Klik Sumber</a>
                    </div>
                </div>
            </div>`;
};

const showAlert = (icon, title) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    Toast.fire({
        icon: icon,
        title: title,
    });
};
