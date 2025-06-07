document.addEventListener('DOMContentLoaded', function () {
    // 위시리스트 상태 로드
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    document.querySelectorAll('.wishlist-button').forEach(btn => {
        const pid = btn.dataset.productId;
        if (wishlist.includes(pid)) btn.classList.add('active');
        btn.addEventListener('click', function () {
            let list = JSON.parse(localStorage.getItem('wishlist') || '[]');
            if (list.includes(pid)) {
                list = list.filter(id => id !== pid);
                btn.classList.remove('active');
            } else {
                list.push(pid);
                btn.classList.add('active');
            }
            localStorage.setItem('wishlist', JSON.stringify(list));
        });
    });
});