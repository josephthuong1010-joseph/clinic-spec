/* sections/overview.js — Tổng quan hệ thống + Phân hệ M01-M09 (đồng bộ SE-project-main@484098c, 22/11/2026) */

window.SECTION_OVERVIEW = `
<section class="section" id="overview">
  <div class="sh"><span class="sh-ic">📌</span><div class="sh-txt"><h2>Tổng quan hệ thống</h2><p>ClinicCare — hệ thống quản lý phòng khám ngoại trú tích hợp khám từ xa WebRTC (đồng bộ mã nguồn <code>main@484098c</code> · 22/11/2026)</p></div></div>

  <div class="sum-bar">
    <div class="sum-item"><div class="n">9</div><div class="l">Phân hệ (M01–M09)</div></div>
    <div class="sum-item"><div class="n">27</div><div class="l">Yêu cầu chức năng (FR)</div></div>
    <div class="sum-item"><div class="n" style="color:var(--ok)">16 / 16</div><div class="l">NFR đạt nghiệm thu</div></div>
    <div class="sum-item"><div class="n">27</div><div class="l">Use Case</div></div>
    <div class="sum-item"><div class="n">19</div><div class="l">Quy tắc nghiệp vụ (BR)</div></div>
    <div class="sum-item"><div class="n">50 / 61</div><div class="l">Đường dẫn / Thao tác API</div></div>
    <div class="sum-item"><div class="n">29+</div><div class="l">Sơ đồ UML &amp; ERD</div></div>
  </div>

  <div class="ov-grid">
    <div class="ov-card"><h4>Backend &amp; Bảo mật</h4><p>Java 21 · Spring Boot 3.5 modular monolith · MySQL 8.4 · Flyway <code>V1..V11</code> · HikariCP (pool 30) · AES-256-GCM &amp; HMAC-SHA256 tách khóa</p></div>
    <div class="ov-card"><h4>Frontend</h4><p>React 18 · TypeScript 5 · Vite 8 · React Router · WebRTC P2P (<code>RTCPeerConnection</code>, ICE restart, audio-only fallback)</p></div>
    <div class="ov-card"><h4>Xác thực &amp; IdP</h4><p>Keycloak 26.4 (OIDC Authorization Code + PKCE S256) · Google OAuth2 · Quên mật khẩu SMTP · Khóa tạm 5 lần sai · OTP email 6 chữ số</p></div>
    <div class="ov-card"><h4>Hạ tầng &amp; Vận hành</h4><p>Azure VM HTTPS (Caddy 2 + Nginx 1.28 rate-limit OTP 10r/m + coturn TURN 3478) · CI 5 job + rollback tự động + <code>post-deploy-smoke</code></p></div>
    <div class="ov-card"><h4>Kiểm thử tự động</h4><p>86 test Backend (Testcontainers MySQL + <code>jacoco:check</code> &ge;60%) · 79 Vitest (22 file) · 17 Playwright · Python unittest · k6 50 VU</p></div>
    <div class="ov-card"><h4>Phiên bản đối chiếu</h4><p>Nhánh <code>main@484098c</code> · 22/11/2026 · Demo HTTPS: <code>cliniccare-demo.duckdns.org</code> &amp; <code>cliniccare-auth.duckdns.org</code></p></div>
  </div>

  <div class="stack-grid">
    <div class="stk">Java 21 <span>Spring Boot 3.5</span></div>
    <div class="stk">MySQL 8.4 <span>InnoDB · Flyway V1–V11</span></div>
    <div class="stk">Keycloak 26.4 <span>OIDC PKCE + Google</span></div>
    <div class="stk">React 18 <span>TypeScript 5 · Vite 8</span></div>
    <div class="stk">WebRTC + coturn 4.7 <span>UDP/TCP 3478 · ICE restart</span></div>
    <div class="stk">OpenAPI 3.1 <span>50 paths · 61 ops</span></div>
    <div class="stk">Caddy 2 + Nginx 1.28 <span>HSTS · CSP · 429 limit</span></div>
    <div class="stk">JUnit 5 + JaCoCo <span>86 tests · &ge;60% gate</span></div>
    <div class="stk">Vitest 5.1 + Playwright <span>79 unit + 17 E2E/axe</span></div>
    <div class="stk">k6 Load Test <span>50 VU · p95 9,37 ms</span></div>
  </div>

  <div class="ov-grid">
    <div class="ov-card"><h4>5 Vai trò hệ thống</h4><p><code>PATIENT</code> · <code>DOCTOR</code> · <code>RECEPTIONIST</code> · <code>ADMINISTRATOR</code> · <code>AUDITOR</code></p></div>
    <div class="ov-card"><h4>Hình thức khám</h4><p><code>IN_PERSON</code> (trực tiếp tại phòng khám) · <code>REMOTE</code> (khám từ xa WebRTC)</p></div>
    <div class="ov-card"><h4>Hạn chế đã sửa (BE-01..04)</h4><p>Cả 4 lỗi tồn đọng ban đầu (audit DENIED, quyền lễ tân đọc availability/slots, khóa catalog AUDITOR, hàng rỗng trả 204) đều đã sửa và đạt hồi quy <code>RG-01..RG-12</code>.</p></div>
    <div class="ov-card"><h4>Ranh giới &amp; Rủi ro chấp nhận</h4><p>Fallback mật khẩu mẫu <code>DemoClinic</code> chỉ áp dụng cho môi trường demo dữ liệu giả; <code>AC-24-E</code> (provider webhook đóng phòng phía server) nằm ngoài kiến trúc P2P hiện có.</p></div>
  </div>
</section>

<section class="section" id="modules">
  <div class="sh"><span class="sh-ic">🧩</span><div class="sh-txt"><h2>Phân hệ M01–M09</h2><p>9 bounded contexts ánh xạ trực tiếp tới 27 FR và 27 Use Case</p></div></div>
  <div class="mod-grid">
    <div class="mod m1"><h4>M01 · Xác thực &amp; Tài khoản</h4><p>OIDC PKCE S256, Google OAuth2, quên mật khẩu SMTP, khóa tạm 5 lần sai, OTP 6 số đổi email, tra cứu UUID/email/SĐT qua blind index HMAC</p></div>
    <div class="mod m2"><h4>M02 · Bác sĩ &amp; Chuyên khoa</h4><p>Danh mục bác sĩ, chuyên khoa, kích hoạt/ngừng nhận lịch an toàn khi không còn lịch hẹn tương lai</p></div>
    <div class="mod m3"><h4>M03 · Lịch làm việc &amp; Giờ khám</h4><p>Giờ hoạt động hằng tuần, ngày nghỉ lễ ưu tiên, lịch làm/nghỉ bác sĩ, truy vấn slot khả dụng tối ưu <code>p95 = 7,81 ms</code></p></div>
    <div class="mod m4"><h4>M04 · Lịch hẹn &amp; Vắng hẹn</h4><p>Đặt/đổi/hủy (<code>&ge;2h</code>), chống trùng bác sĩ &amp; bệnh nhân, Idempotency 24h, chuyển tiến trình và ghi nhận <code>NO_SHOW</code></p></div>
    <div class="mod m5"><h4>M05 · Hồ sơ lâm sàng</h4><p>Encounter, hồ sơ <code>DRAFT &rarr; FINAL</code> bất biến, bản bổ sung có lý do (khóa lạc quan), đơn thuốc <code>ISSUED</code> bất biến</p></div>
    <div class="mod m6"><h4>M06 · Thông báo Outbox</h4><p>Xác nhận, nhắc trước 30 phút, báo chậm giờ <code>DELAY_NOTICE</code>, lời mời đặt lại <code>NO_SHOW</code>, thử lại SMTP 1/5/15 phút</p></div>
    <div class="mod m7"><h4>M07 · Kiểm toán &amp; Bảo vệ</h4><p>Ghi audit fail-closed cùng giao dịch, tra cứu phân trang cho <code>AUDITOR</code> (không lộ PHI), khóa/mở tài khoản bệnh nhân có lý do</p></div>
    <div class="mod m8"><h4>M08 · Tiếp đón &amp; Hàng đợi</h4><p>Check-in trực tiếp <code>[-15p, +15p)</code>, gọi lượt FIFO dưới khóa <code>Doctor</code> (hàng rỗng trả 204), trả phiếu về cuối hàng giữ ID</p></div>
    <div class="mod m9"><h4>M09 · Khám từ xa WebRTC</h4><p>Phòng chờ <code>[-10p, +15p)</code>, token phòng TTL 300s, signaling nội bộ, <code>coturn</code> STUN/TURN 3478, ICE restart &amp; audio-only</p></div>
  </div>
</section>
`;
