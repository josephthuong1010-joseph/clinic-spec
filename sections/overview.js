/* sections/overview.js — Tổng quan hệ thống, Chuẩn áp dụng & Phân hệ M01-M09 (đồng bộ SE-project-main, 24/11/2026) */

window.SECTION_OVERVIEW = `
<section class="section" id="overview">
  <div class="sh"><span class="sh-ic">📌</span><div class="sh-txt"><h2>Tổng quan hệ thống</h2><p>ClinicCare — hệ thống quản lý phòng khám ngoại trú tích hợp khám từ xa WebRTC (đồng bộ mã nguồn <code>SE-project-main</code> · 24/11/2026)</p></div></div>

  <div class="sum-bar">
    <div class="sum-item"><div class="n">9</div><div class="l">Phân hệ (M01–M09)</div></div>
    <div class="sum-item"><div class="n">27</div><div class="l">Yêu cầu chức năng (FR)</div></div>
    <div class="sum-item"><div class="n" style="color:var(--ok)">16 / 16</div><div class="l">NFR đạt nghiệm thu</div></div>
    <div class="sum-item"><div class="n">27</div><div class="l">Use Case</div></div>
    <div class="sum-item"><div class="n">19</div><div class="l">Quy tắc nghiệp vụ (BR)</div></div>
    <div class="sum-item"><div class="n">55 / 67</div><div class="l">Đường dẫn / Thao tác API</div></div>
    <div class="sum-item"><div class="n" style="color:var(--ok)">38</div><div class="l">Sơ đồ UML &amp; ERD (đồng bộ)</div></div>
  </div>

  <div class="ov-grid">
    <div class="ov-card"><h4>Backend &amp; Bảo mật</h4><p>Java 21 · Spring Boot 3.5 modular monolith · MySQL 8.4 · Flyway <code>V1..V13</code> (26 bảng) · HikariCP (pool 30) · AES-256-GCM, <code>K_hmac</code> blind index &amp; chuỗi băm kiểm toán <code>HMAC-SHA256-CHAIN-V1</code></p></div>
    <div class="ov-card"><h4>Frontend</h4><p>React 18 · TypeScript 5 · Vite 8 · React Router · WebRTC P2P (<code>RTCPeerConnection</code>, ICE restart, audio-only fallback)</p></div>
    <div class="ov-card"><h4>Xác thực &amp; IdP</h4><p>Keycloak 26.4 (OIDC PKCE S256 trung tính 5 vai trò) · Google OAuth2 · Đăng ký đồng bộ hồ sơ cá nhân (SĐT VN 10 số, chu kỳ sửa 90 ngày) · Đổi MK AIA &amp; Quên MK SMTP · Khóa tạm 5 lần sai · OTP email 6 số</p></div>
    <div class="ov-card"><h4>Hạ tầng &amp; Vận hành</h4><p>Azure VM HTTPS (Caddy 2 + Nginx 1.28 rate-limit OTP 10r/m + coturn TURN 3478) · CI 5 job + rollback tự động + <code>post-deploy-smoke</code></p></div>
    <div class="ov-card"><h4>Kiểm thử tự động</h4><p>106 test Backend (Testcontainers MySQL + Unit + <code>jacoco:check</code> &ge;60%) · 113+ Vitest · 17 Playwright · Python unittest · k6 50 VU</p></div>
    <div class="ov-card"><h4>Phiên bản đối chiếu</h4><p>Nhánh <code>main</code> (<code>V1..V13</code>) · 24/11/2026 · Demo HTTPS: <code>cliniccare-demo.duckdns.org</code> &amp; <code>cliniccare-auth.duckdns.org</code></p></div>
  </div>

  <div class="stack-grid">
    <div class="stk">Java 21 <span>Spring Boot 3.5</span></div>
    <div class="stk">MySQL 8.4 <span>InnoDB · Flyway V1–V13</span></div>
    <div class="stk">Keycloak 26.4 <span>OIDC PKCE + Google</span></div>
    <div class="stk">React 18 <span>TypeScript 5 · Vite 8</span></div>
    <div class="stk">WebRTC + coturn 4.7 <span>UDP/TCP 3478 · ICE restart</span></div>
    <div class="stk">OpenAPI 3.1 <span>55 paths · 67 ops</span></div>
    <div class="stk">Caddy 2 + Nginx 1.28 <span>HSTS · CSP · 429 limit</span></div>
    <div class="stk">JUnit 5 + JaCoCo <span>106 tests · &ge;60% gate</span></div>
    <div class="stk">Vitest 5.1 + Playwright <span>113+ unit + 17 E2E/axe</span></div>
    <div class="stk">k6 Load Test <span>50 VU · p95 9,58 ms</span></div>
  </div>

  <div class="ov-grid">
    <div class="ov-card"><h4>5 Vai trò hệ thống</h4><p><code>PATIENT</code> · <code>DOCTOR</code> · <code>RECEPTIONIST</code> · <code>ADMINISTRATOR</code> · <code>AUDITOR</code></p></div>
    <div class="ov-card"><h4>Hình thức khám</h4><p><code>IN_PERSON</code> (trực tiếp tại phòng khám) · <code>REMOTE</code> (khám từ xa WebRTC)</p></div>
    <div class="ov-card"><h4>Hạn chế đã sửa (BE-01..04)</h4><p>Cả 4 lỗi tồn đọng ban đầu (audit DENIED, quyền lễ tân đọc availability/slots, khóa catalog AUDITOR, hàng rỗng trả 204) đều đã sửa và đạt hồi quy <code>RG-01..RG-12</code>.</p></div>
    <div class="ov-card"><h4>Ranh giới &amp; Rủi ro chấp nhận</h4><p>Fallback mật khẩu mẫu <code>DemoClinic</code> chỉ áp dụng cho môi trường demo dữ liệu giả; <code>AC-24-E</code> (provider webhook đóng phòng phía server) nằm ngoài kiến trúc P2P hiện có.</p></div>
  </div>
</section>

<section class="section" id="standards">
  <div class="sh"><span class="sh-ic">📏</span><div class="sh-txt"><h2>Chuẩn &amp; Quy ước áp dụng trong dự án</h2><p>Cơ sở phương pháp luận phục vụ đặc tả yêu cầu, mô hình hóa thiết kế, bảo mật và kiểm thử</p></div></div>
  <div class="tbl-wrap">
    <table>
      <thead><tr><th>Mảng công việc</th><th>Chuẩn / Quy ước áp dụng</th><th>Phạm vi áp dụng thực tế trong ClinicCare</th></tr></thead>
      <tbody>
        <tr><td><strong>Yêu cầu chức năng (FR)</strong></td><td><strong>EARS</strong> (<em>Easy Approach to Requirements Syntax</em>) · tham chiếu <strong>ISO/IEC/IEEE 29148</strong></td><td>Viết 27 FR theo mẫu <code>KHI / NẾU / TRONG KHI ... PHẢI ...</code> gắn ngưỡng định lượng tại <a href="requirements.html#fr">trang Yêu cầu</a>.</td></tr>
        <tr><td><strong>Đặc tả Use Case (UC)</strong></td><td><strong>Alistair Cockburn — Fully Dressed Use Case</strong> + <strong>OMG UML 2.5</strong></td><td>Mỗi ca trong 27 UC có đủ: Tác nhân, Tiền điều kiện, Kích hoạt, Luồng chính/thay thế, Ngoại lệ, Hậu điều kiện tại <a href="usecases.html">trang Use Case</a>.</td></tr>
        <tr><td><strong>Tiêu chí chấp nhận (AC)</strong></td><td><strong>BDD / Gherkin</strong> (<code>Given – When – Then</code>)</td><td>Chuẩn hóa kịch bản kiểm chứng từng FR trong <code>docs/requirements/acceptance-criteria.md</code>.</td></tr>
        <tr><td><strong>Chất lượng &amp; Phi chức năng (NFR)</strong></td><td><strong>ISO/IEC 25010:2023</strong></td><td>Phân loại 16 NFR theo hiệu năng, bảo mật, tin cậy, khả dụng, tương thích, bảo trì và an toàn vận hành.</td></tr>
        <tr><td><strong>Kiến trúc &amp; Mô hình hóa</strong></td><td><strong>OMG UML 2.5</strong> · <strong>Kruchten 4+1 Views</strong> · <strong>IE / Crow's Foot ERD</strong></td><td>38 sơ đồ tại <a href="diagrams.html">Sơ đồ UML</a> (đủ M01–M09, CI/CD rollback, Class PIM 26 thực thể, ERD 26 bảng <code>V1..V13</code>, Deployment Docker/Azure).</td></tr>
        <tr><td><strong>Hợp đồng API &amp; Thời gian</strong></td><td><strong>OpenAPI 3.1.0</strong> (JSON Schema 2020-12) · <strong>RFC 9457 / 7807</strong> · <strong>ISO 8601</strong></td><td>55 paths / 67 ops, lỗi <code>ProblemDetail</code>, DB lưu UTC <code>DATETIME(6)</code> và hiển thị <code>Asia/Ho_Chi_Minh</code>.</td></tr>
        <tr><td><strong>Xác thực, Bảo mật &amp; Truyền thông</strong></td><td><strong>OAuth 2.0 (RFC 6749)</strong> · <strong>OIDC 1.0</strong> · <strong>PKCE S256 (RFC 7636)</strong> · <strong>JWT (RFC 7519)</strong> · <strong>NIST SP 800-38D (AES-256-GCM)</strong> · <strong>RFC 2104 (HMAC-SHA256)</strong> · <strong>OWASP ASVS 5.0 / WSTG</strong> · <strong>WebRTC / STUN (RFC 5389) / TURN (RFC 5766)</strong></td><td>PKCE + Google OAuth2, OTP đổi email, blind index <code>K_hmac</code> tách khóa, header HSTS/CSP/XFO, rate-limit <code>10r/m</code> và <code>coturn</code> :3478.</td></tr>
        <tr><td><strong>Kiểm thử &amp; Tiếp cận</strong></td><td><strong>ISO/IEC/IEEE 29119</strong> · <strong>PCL (<code>N / B / A</code>)</strong> · <strong>Arrange–Act–Assert (AAA)</strong> · <strong>WCAG 2.2 AA</strong> (<code>axe-core</code>)</td><td>Truy vết 2 chiều tại <a href="testing.html">Kiểm thử</a> (EP/BVA/State/Branch/Fault injection). Quét tự động hỗ trợ rà soát WCAG, không thay thế kiểm định thủ công.</td></tr>
      </tbody>
    </table>
  </div>
  <div class="alert alert-info" style="margin-top:12px">
    <span>ℹ️</span>
    <div><strong>Nguyên tắc minh bạch học thuật:</strong> Theo quy ước trong <code>docs/testing/test-governance.md</code>, các chuẩn quốc tế nêu trên được <em>tham chiếu và áp dụng làm căn cứ thiết kế, đặc tả và kiểm thử</em> trong phạm vi đồ án — không phải tuyên bố đạt chứng nhận tuân thủ pháp lý hay chứng chỉ ISO/WCAG chính thức.</div>
  </div>
</section>

<section class="section" id="modules">
  <div class="sh"><span class="sh-ic">🧩</span><div class="sh-txt"><h2>Phân hệ M01–M09</h2><p>9 bounded contexts ánh xạ trực tiếp tới 27 FR và 27 Use Case</p></div></div>
  <div class="mod-grid">
    <div class="mod m1"><h4>M01 · Xác thực &amp; Tài khoản</h4><p>OIDC PKCE S256 trung tính 5 vai trò, Google OAuth2, đăng ký đồng bộ hồ sơ (<code>V13</code>, SĐT VN 10 số, chu kỳ sửa 90 ngày), đổi MK AIA &amp; quên MK SMTP, khóa tạm 5 lần sai, OTP 6 số đổi email, tra cứu blind index HMAC</p></div>
    <div class="mod m2"><h4>M02 · Bác sĩ &amp; Chuyên khoa</h4><p>Danh mục bác sĩ, chuyên khoa, kích hoạt/ngừng nhận lịch an toàn khi không còn lịch hẹn tương lai</p></div>
    <div class="mod m3"><h4>M03 · Lịch làm việc &amp; Giờ khám</h4><p>Giờ hoạt động hằng tuần, ngày nghỉ lễ ưu tiên, lịch làm/nghỉ bác sĩ, truy vấn slot khả dụng tối ưu <code>p95 = 6,86 ms</code></p></div>
    <div class="mod m4"><h4>M04 · Lịch hẹn &amp; Vắng hẹn</h4><p>Đặt/đổi/hủy (<code>&ge;2h</code>), chống trùng bác sĩ &amp; bệnh nhân, Idempotency 24h, chuyển tiến trình và ghi nhận <code>NO_SHOW</code></p></div>
    <div class="mod m5"><h4>M05 · Hồ sơ lâm sàng</h4><p>Encounter, hồ sơ <code>DRAFT &rarr; FINAL</code> bất biến, bản bổ sung có lý do (khóa lạc quan), đơn thuốc <code>ISSUED</code> bất biến</p></div>
    <div class="mod m6"><h4>M06 · Thông báo Outbox</h4><p>Xác nhận, nhắc trước 30 phút, báo chậm giờ <code>DELAY_NOTICE</code>, lời mời đặt lại <code>NO_SHOW</code>, thử lại SMTP 1/5/15 phút</p></div>
    <div class="mod m7"><h4>M07 · Kiểm toán &amp; Bảo vệ</h4><p>Ghi audit fail-closed nối chuỗi băm <code>HMAC-SHA256-CHAIN-V1</code> (<code>V12</code>), lọc server-side &amp; phân trang con trỏ, chuẩn hóa hành động tiếng Việt, Summary Bar, xuất CSV UTF-8 BOM chống formula injection, kiểm chứng toàn vẹn &amp; niêm phong lưu trữ <code>365/1.825</code> ngày</p></div>
    <div class="mod m8"><h4>M08 · Tiếp đón &amp; Hàng đợi</h4><p>Check-in trực tiếp <code>[-15p, +15p)</code>, gọi lượt FIFO dưới khóa <code>Doctor</code> (hàng rỗng trả 204), trả phiếu về cuối hàng giữ ID</p></div>
    <div class="mod m9"><h4>M09 · Khám từ xa WebRTC</h4><p>Phòng chờ <code>[-10p, +15p)</code>, token phòng TTL 300s, signaling nội bộ, <code>coturn</code> STUN/TURN 3478, ICE restart &amp; audio-only</p></div>
  </div>
</section>
`;
