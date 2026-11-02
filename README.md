# 🐻 Bubu & Dudu - Whack-a-Mole Game 🐼

Game đập chuột chũi phong cách siêu đáng yêu với cặp đôi **Bubu & Dudu** (chú gấu trúc Panda & chú gấu nâu Brown Bear).

![Bubu & Dudu](public/assets/bubu_dudu/bubu_normal.gif)
![Dudu](public/assets/bubu_dudu/dudu_normal.gif)

## 🎮 Cách Chơi (Gameplay Rules)

* **🐻 Đập Dudu (Gấu Nâu)**: Gõ thật nhanh để nhận **+10 điểm** và chuỗi **Combo x2, x3**. Dudu bị gõ sẽ khóc ròng ôm tay đáng thương!
* **🐼 CẤM ĐẬP Bubu (Gấu Trúc)**: Đập nhầm Bubu sẽ bị trừ **15 điểm**, mất **1 trái tim (💔)** và mất toàn bộ chuỗi Combo! Hết 3 mạng là Game Over!
* **🧋 Cốc Trà Sữa Thần Kỳ (Bonus Item)**: Bắt trúng cốc trà sữa trân châu để nhận ngay **+50 điểm** và **+5 giây thời gian**!
* **🎨 Chế độ Skin Switcher**: Có thể bấm nút 🐻 / 🎨 trên thanh điều khiển để đổi qua lại giữa **Sticker Hoạt Hình Thật** và **Vector HD**.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

* **Framework & Build tool**: [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Đồ họa**: Asset GIF / WebP hoạt hình chuẩn Bubu & Dudu của tác giả Huang Xiao B (黄小B) + Vector SVG tuỳ biến.
* **Âm thanh**: Web Audio API Synthesizer (tự tạo âm thanh hiệu ứng tiếng chít chít, tiếng khóc, tiếng leng keng và nhạc nền chiptune BGM không cần load file mp3 ngoài).
* **Hiệu ứng đặc biệt**: Custom hammer cursor, rung lắc màn hình khi đập nhầm, Canvas Confetti khi phá kỷ lục High Score.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Môi Trường Cục Bộ

1. **Clone repository về máy**:
   ```bash
   git clone https://github.com/thanhhoang261/whac-a-mole.git
   cd whac-a-mole
   ```

2. **Cài đặt thư viện phụ thuộc**:
   ```bash
   npm install
   ```

3. **Khởi chạy Development Server**:
   ```bash
   npm run dev
   ```
   Mở trình duyệt tại [http://localhost:5173/](http://localhost:5173/) để chơi game!

4. **Đóng gói sản phẩm (Build for Production)**:
   ```bash
   npm run build
   ```
