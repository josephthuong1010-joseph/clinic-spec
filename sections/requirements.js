/* sections/requirements.js — Đồng bộ đầy đủ 27 FR (EARS), 16 NFR + Bằng chứng, 19 BR, Công thức lượng hóa & Ma trận rà soát (SE-project-main@d0f7189, 22/11/2026) */

window.SECTION_REQUIREMENTS = `
<section class="section" id="req-summary">
  <div class="sh"><span class="sh-ic">📌</span><div class="sh-txt"><h2>Tổng hợp Đặc tả Yêu cầu &amp; Bằng chứng Nghiệm thu</h2><p>Đối chiếu đồng bộ 1:1 với kho mã nguồn <code>SE-project-main</code> (nhánh <code>main@d0f7189</code> · 22/11/2026)</p></div></div>

  <div class="alert alert-info" style="margin-bottom:14px">
    <span>📏</span>
    <div><strong>Chuẩn đặc tả áp dụng:</strong> Yêu cầu chức năng theo cú pháp <strong>EARS</strong> (tham chiếu <strong>ISO/IEC/IEEE 29148</strong>); Tiêu chí chấp nhận theo <strong>BDD / Gherkin</strong> (<code>Given–When–Then</code>); Phi chức năng theo <strong>ISO/IEC 25010:2023</strong>; Hợp đồng API theo <strong>OpenAPI 3.1.0</strong> &amp; <strong>RFC 9457</strong>. Chi tiết toàn bộ bảng chuẩn xem tại <a href="index.html#standards">Tổng quan</a>.</div>
  </div>

  <div class="sum-bar">
    <div class="sum-item"><div class="n">27 / 27</div><div class="l">FR đã triển khai</div></div>
    <div class="sum-item"><div class="n" style="color:var(--ok)">16 / 16</div><div class="l">NFR đạt nghiệm thu</div></div>
    <div class="sum-item"><div class="n">19</div><div class="l">Quy tắc nghiệp vụ (BR)</div></div>
    <div class="sum-item"><div class="n">50 / 61</div><div class="l">API Paths / Operations</div></div>
    <div class="sum-item"><div class="n" style="color:var(--ok)">86 + 79</div><div class="l">Test BE (MySQL) + FE (Vitest)</div></div>
    <div class="sum-item"><div class="n" style="color:var(--ok)">7,81 ms</div><div class="l">NFR-01 /api/slots p95</div></div>
  </div>

  <div class="alert alert-ok">
    <span>✅</span>
    <div><strong>Trạng thái đồng bộ:</strong> Các lỗi tồn đọng cũ (<code>BE-01..04</code>) đều đã được khắc phục và kiểm chứng hồi quy (<code>RG-01..12</code>). Các tính năng mở rộng thực tế (Google OAuth2, Quên mật khẩu SMTP, Khóa tạm 5 lần sai, OTP 6 số đổi email, Tra cứu UUID/email/SĐT qua HMAC tách khóa, Báo chậm giờ, Vắng hẹn <code>NO_SHOW</code>, Ngày nghỉ lễ, Rollback &amp; Smoke test tự động) đã được lượng hóa và cập nhật đầy đủ vào đặc tả này.</div>
  </div>

  <div class="ears-box">
    <span class="kw">KHI</span> &lt;sự kiện kích hoạt&gt;, <span class="sys">hệ thống</span> <span class="act">PHẢI &lt;hành động / phản hồi quan sát được kèm tham số định lượng&gt;</span><br>
    <span class="kw">NẾU</span> &lt;điều kiện tiền đề hoặc bất thường&gt;, <span class="sys">hệ thống</span> <span class="act">PHẢI &lt;xử lý an toàn / hoàn tác / mã HTTP&gt;</span><br>
    <span class="kw">TRONG KHI</span> &lt;trạng thái phiên đang duy trì&gt;, <span class="sys">hệ thống</span> <span class="act">PHẢI &lt;duy trì ràng buộc đồng bộ&gt;</span>
  </div>
</section>

<section class="section" id="fr">
  <div class="sh"><span class="sh-ic">✅</span><div class="sh-txt"><h2>Yêu cầu chức năng (27 FR — Cú pháp EARS)</h2><p>Nhấn vào từng hàng để xem đặc tả lượng hóa, quy tắc liên quan, ca kiểm thử, bằng chứng đạt và sơ đồ luồng</p></div></div>

  <div class="filter-bar">
    <input type="search" class="search-in" placeholder="Tìm theo mã FR, tên, endpoint API, quy tắc BR, tên test..." oninput="setSearchFilter('fr', this.value)">
    <div class="chip-group">
      <button type="button" class="chip active" onclick="setModuleFilter('fr','ALL',this)">Tất cả</button>
      <button type="button" class="chip" onclick="setModuleFilter('fr','M01',this)">M01</button>
      <button type="button" class="chip" onclick="setModuleFilter('fr','M02',this)">M02</button>
      <button type="button" class="chip" onclick="setModuleFilter('fr','M03',this)">M03</button>
      <button type="button" class="chip" onclick="setModuleFilter('fr','M04',this)">M04</button>
      <button type="button" class="chip" onclick="setModuleFilter('fr','M05',this)">M05</button>
      <button type="button" class="chip" onclick="setModuleFilter('fr','M06',this)">M06</button>
      <button type="button" class="chip" onclick="setModuleFilter('fr','M07',this)">M07</button>
      <button type="button" class="chip" onclick="setModuleFilter('fr','M08',this)">M08</button>
      <button type="button" class="chip" onclick="setModuleFilter('fr','M09',this)">M09</button>
    </div>
    <button type="button" class="btn-mini" onclick="toggleAllDetails('fr', true)">Mở tất cả</button>
    <button type="button" class="btn-mini" onclick="toggleAllDetails('fr', false)">Thu gọn</button>
    <span class="filter-count" id="count-fr">Hiển thị 27 / 27 mục</span>
  </div>

  <div class="tbl-wrap">
    <table>
      <thead><tr><th>Mã</th><th>Tên yêu cầu</th><th>Phân hệ</th><th>Mô tả EARS (đã lượng hóa)</th><th>UC · Trạng thái</th></tr></thead>
      <tbody>

        <!-- M01 -->
        <tr class="fr-row" data-id="FR-01" data-module="M01" onclick="toggleFR('FR-01')">
          <td><strong>FR-01</strong><span class="fr-arr" id="arr-FR-01">▸</span></td>
          <td>Xác thực OIDC, Google OAuth2, Quên mật khẩu &amp; OTP email</td>
          <td><span class="badge bm1">M01</span></td>
          <td>KHI xác thực (mật khẩu &ge;8 ký tự hoặc Google OAuth2), tạo phiên PKCE S256 <code>UUIDv3(issuer|subject)</code>; khóa tạm 5 lần sai (60–900s); đổi email cần OTP 6 số</td>
          <td>UC-01 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-01"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> IdP (Keycloak 26.4) xác thực hợp lệ qua tài khoản/email (tối thiểu 8 ký tự) hoặc Google OAuth2, hệ thống <span class="kw-shall">PHẢI</span> tạo phiên PKCE S256 gắn định danh tất định <code>UUIDv3(issuer|subject)</code>, tự cấp vai trò <code>PATIENT</code> lần đầu, bật khóa tạm <code>60–900 s</code> sau 5 lần nhập sai trong <code>900 s</code>, hỗ trợ quên mật khẩu qua SMTP với thông báo trung tính, và yêu cầu xác thực OTP 6 chữ số (TTL <code>300 s</code>, cooldown <code>30 s</code>, tối đa 5 lần sai, tối đa 5 lượt/giờ/email đích) khi đổi sang email mới (<code>V9__contact_otp.sql</code>).</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>GET /me</code>, <code>GET /me/profile</code>, <code>POST /me/contact/otp</code>, <code>PUT /me/contact</code> · <code>Access.java</code>, <code>ContactOtpService.java</code>, <code>JdbcContactOtpStore.java</code>, <code>Crypto.java</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-01, BR-12 · UC-01 · AC-01 (6 kịch bản Gherkin) · NFR-04, NFR-15</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-01</code>, <code>TC-01-C..F</code>, <code>TC-N06/B06/A09/A10</code>, <code>AGENT-TC-002..016</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>ContactOtpServiceTest</code> (5/5 PASS), <code>PatientAccountIntegrationTest</code> (MySQL 8.4 CI <code>#43</code>), <code>JwtValidationTest</code> (5/5), <code>account-page.test.tsx</code> (2/2), <code>test_azure_google_oauth.py</code>, <code>test:auth-runtime</code> (5/5). *(Google/Recovery/Brute-force 5x còn thiếu E2E tự động CI.)*</div></div>
          </div>
          <div class="mermaid-wrap"><div class="mermaid">
sequenceDiagram
  actor U as Người dùng
  participant FE as Frontend
  participant KC as Keycloak / Google
  participant API as Access &amp; ContactOtpService
  participant DB as MySQL

  U-&gt;&gt;FE: Đăng nhập (Mật khẩu / Google / Quên MK)
  FE-&gt;&gt;KC: OIDC Authorization Code + PKCE S256
  KC--&gt;&gt;FE: Code &rarr; access_token JWT
  FE-&gt;&gt;API: GET /api/me/profile (Bearer JWT)
  API-&gt;&gt;DB: UUIDv3(issuer|subject), mã hóa email AES-GCM + K_hmac
  API--&gt;&gt;FE: 200 Hồ sơ tài khoản &amp; vai trò
  U-&gt;&gt;FE: Đổi email nhận thông báo mới
  FE-&gt;&gt;API: POST /api/me/contact/otp
  API-&gt;&gt;DB: Lưu băm OTP (TTL 300s, cooldown 30s, 5/h) + gửi SMTP
  U-&gt;&gt;FE: Nhập OTP 6 chữ số &rarr; PUT /api/me/contact
  API-&gt;&gt;DB: Xác thực OTP một lần &amp; cập nhật email_encrypted/email_hash
          </div></div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/sequence-diagrams/auth-otp-contact.png')"><img src="assets/design/sequence-diagrams/auth-otp-contact.png" alt=""><span>Sequence: PKCE/Google &amp; OTP</span></div>
            <div class="fr-diag-thumb" onclick="lb('assets/design/activity-diagrams/account-security-otp.png')"><img src="assets/design/activity-diagrams/account-security-otp.png" alt=""><span>Activity: Bảo mật TK &amp; OTP</span></div>
          </div>
        </div></td></tr>

        <tr class="fr-row" data-id="FR-02" data-module="M01" onclick="toggleFR('FR-02')">
          <td><strong>FR-02</strong><span class="fr-arr" id="arr-FR-02">▸</span></td>
          <td>Phân quyền vai trò, tài nguyên &amp; điều hướng Guard</td>
          <td><span class="badge bm1">M01</span></td>
          <td>NẾU vai trò VÀ quan hệ tài nguyên hợp lệ mới cho phép; đăng nhập lại tài khoản khác quyền tự về trang chủ vai trò mới</td>
          <td>UC-02 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-02"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> nhận yêu cầu bảo vệ, hệ thống <span class="kw-shall">PHẢI</span> đối chiếu vai trò thực từ bảng <code>user_role</code> trong CSDL và quan hệ sở hữu tài nguyên trước khi xử lý (từ chối trả 403/404 và ghi audit <code>DENIED</code>). Khi người dùng đăng nhập lại bằng tài khoản có vai trò khác URL lưu từ phiên trước (<code>fromSignin=true</code>), giao diện (<code>Guard.tsx</code>) tự chuyển về trang chủ vai trò mới thay vì dừng ở trang 403, đồng thời giữ nguyên 403 cho mọi truy cập trực tiếp trái quyền.</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>GET /me</code>, <code>GET /users</code>, <code>PUT /users/{id}/roles</code>, <code>GET /appointments</code> · <code>Access.java</code>, <code>Guard.tsx</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-01, BR-13, BR-16 · UC-02 · AC-02 · NFR-03</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-02</code>, <code>RG-02</code>, <code>RG-03</code>, <code>RG-09</code>, <code>AGENT-TC-005</code>, <code>AGENT-TC-017</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>SchedulingIntegrationTest</code>, <code>PatientAccountIntegrationTest</code>, <code>BusinessRulesUnitTest</code>, <code>guard-redirect.test.tsx</code> (2/2 PASS), <code>account-permissions.test.tsx</code> (3/3).</div></div>
          </div>
          <div class="mermaid-wrap"><div class="mermaid">
sequenceDiagram
  actor U as Người dùng
  participant FE as Guard.tsx
  participant API as Backend API
  participant DB as MySQL (user_role)
  participant AUD as Audit

  U-&gt;&gt;FE: Mở route bảo vệ hoặc Gọi API + JWT
  API-&gt;&gt;DB: Đọc role nội bộ &amp; quyền sở hữu tài nguyên
  alt Hợp lệ
    API--&gt;&gt;U: 200 Dữ liệu được phép
  else Đổi tài khoản sau signin (UI)
    FE--&gt;&gt;U: Chuyển hướng về trang chủ vai trò mới
  else Truy cập trái quyền / IDOR
    API-&gt;&gt;AUD: Ghi audit DENIED mang X-Request-Id
    API--&gt;&gt;U: 403 / 404 (ẩn tài nguyên)
  end
          </div></div>
        </div></td></tr>

        <!-- M02 -->
        <tr class="fr-row" data-id="FR-03" data-module="M02" onclick="toggleFR('FR-03')">
          <td><strong>FR-03</strong><span class="fr-arr" id="arr-FR-03">▸</span></td>
          <td>Quản lý danh mục bác sĩ, chuyên khoa &amp; cấp nhân sự</td>
          <td><span class="badge bm2">M02</span></td>
          <td>KHI quản trị tạo hoặc sửa bác sĩ/chuyên khoa, hệ thống PHẢI xác thực chuyên khoa đang active và tài khoản nhân sự hợp lệ</td>
          <td>UC-03 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-03"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> quản trị viên tạo hoặc cập nhật hồ sơ bác sĩ và chuyên khoa (hoặc cấp tài khoản nhân sự qua Keycloak Admin API), hệ thống <span class="kw-shall">PHẢI</span> kiểm tra tính tồn tại và trạng thái <code>active=TRUE</code> của chuyên khoa cũng như vai trò <code>DOCTOR</code> trước khi kích hoạt, đồng thời ghi nhận audit.</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>GET/POST/PUT /specialties</code>, <code>GET/POST/PUT /doctors</code>, <code>POST /staff/provision</code>, <code>PUT /staff/{id}</code> · <code>CatalogService.java</code>, <code>StaffProvisioning.java</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-01, BR-05 · UC-03 · AC-03 · NFR-03, NFR-11</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-03</code>, <code>RG-09</code>, <code>AGENT-TC-020</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>SchedulingIntegrationTest</code>, <code>StaffProvisioningIntegrationTest</code> (2/2), <code>BusinessRulesUnitTest</code>, <code>specialties-ui.test.tsx</code>.</div></div>
          </div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/class-diagram/class-diagram.png')"><img src="assets/design/class-diagram/class-diagram.png" alt=""><span>Class Diagram: Catalog &amp; Entities</span></div>
            <div class="fr-diag-thumb" onclick="lb('assets/design/sequence-diagrams/staff-and-catalog.png')"><img src="assets/design/sequence-diagrams/staff-and-catalog.png" alt=""><span>Sequence M02: Cấp nhân sự Keycloak</span></div>
          </div>
        </div></td></tr>

        <tr class="fr-row" data-id="FR-04" data-module="M02" onclick="toggleFR('FR-04')">
          <td><strong>FR-04</strong><span class="fr-arr" id="arr-FR-04">▸</span></td>
          <td>Ngừng hoạt động / Vô hiệu hóa nhận lịch bác sĩ</td>
          <td><span class="badge bm2">M02</span></td>
          <td>NẾU còn lịch tương lai (CONFIRMED/CHECKED_IN/IN_PROGRESS) PHẢI trả 409; ngược lại vô hiệu hóa và giữ nguyên lịch sử</td>
          <td>UC-04 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-04"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> quản trị viên yêu cầu ngừng hoạt động bác sĩ, hệ thống <span class="kw-shall">PHẢI</span> khóa bản ghi tài khoản và bác sĩ, từ chối <code>409</code> nếu còn lịch tương lai ở trạng thái hiệu lực (<code>CONFIRMED</code>, <code>CHECKED_IN</code>, <code>IN_PROGRESS</code>); nếu trống mới đặt <code>doctor.active=FALSE</code> và bảo toàn toàn bộ hồ sơ lịch sử.</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>PUT /doctors/{id}</code> (<code>active=false</code>) · <code>CatalogService.updateDoctor</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-05 · UC-04 · AC-04 · NFR-02</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-04</code>, <code>RG-08</code>, <code>RG-09</code>, <code>AGENT-TC-020</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>doctorDeactivationChecksBookingsCommittedAfterItsInitialRead</code> (<code>RG-08</code>), <code>doctorActivationChecksStaffRolesCommittedAfterItsInitialRead</code> (<code>RG-09</code>), <code>BusinessRulesUnitTest</code>.</div></div>
          </div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/sequence-diagrams/staff-and-catalog.png')"><img src="assets/design/sequence-diagrams/staff-and-catalog.png" alt=""><span>Sequence M02: Ngừng nhận lịch RG-08/09</span></div>
          </div>
        </div></td></tr>

        <!-- M03 -->
        <tr class="fr-row" data-id="FR-05" data-module="M03" onclick="toggleFR('FR-05')">
          <td><strong>FR-05</strong><span class="fr-arr" id="arr-FR-05">▸</span></td>
          <td>Lịch làm việc, giờ phòng khám &amp; ngày nghỉ lễ</td>
          <td><span class="badge bm3">M03</span></td>
          <td>KHI lưu khoảng làm việc trong giờ hoạt động hiệu lực <code>H_eff(D)</code>, hệ thống PHẢI sinh slot chia hết không chồng lấp (mặc định 20 phút)</td>
          <td>UC-05 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-05"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> bác sĩ lưu ca làm việc, hệ thống <span class="kw-shall">PHẢI</span> kiểm tra <code>now &lt; start &lt; end</code>, chia hết cho thời lượng slot dương (mặc định <code>20 phút</code>), nằm gọn trong giờ hoạt động hiệu lực <code>H_eff(D)</code> (ngày nghỉ lễ ưu tiên trên giờ hằng tuần), không trùng ca khác (409) và sinh đủ <code>N = (end-start)/(60d)</code> slot liên tiếp.</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>POST/GET /doctors/{id}/availability</code>, <code>DELETE /availability/{id}</code>, <code>GET/PUT /clinic/hours</code>, <code>GET/POST/DELETE /clinic/holidays</code> · <code>ScheduleService.java</code>, <code>ClinicHours.java</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-02, BR-04, BR-05 · UC-05 · AC-05</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-05</code>, <code>RG-06</code>, <code>AGENT-TC-020</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>availabilityChecksShiftsCommittedAfterItsInitialRead</code> (<code>RG-06</code>), <code>BusinessRulesUnitTest</code>, <code>clinic-hours.test.ts</code>, <code>clinic-hours-ui.test.tsx</code>, <code>schedule-manager.test.tsx</code>.</div></div>
          </div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/database/erd.png')"><img src="assets/design/database/erd.png" alt=""><span>ERD: Lịch làm việc &amp; Slot</span></div>
            <div class="fr-diag-thumb" onclick="lb('assets/design/sequence-diagrams/schedule-and-slots.png')"><img src="assets/design/sequence-diagrams/schedule-and-slots.png" alt=""><span>Sequence M03: Giờ mở cửa &amp; Ngày lễ</span></div>
          </div>
        </div></td></tr>

        <tr class="fr-row" data-id="FR-06" data-module="M03" onclick="toggleFR('FR-06')">
          <td><strong>FR-06</strong><span class="fr-arr" id="arr-FR-06">▸</span></td>
          <td>Quản lý lịch nghỉ bác sĩ</td>
          <td><span class="badge bm3">M03</span></td>
          <td>KHI thêm lịch nghỉ, hệ thống PHẢI chặn 409 nếu có lịch hẹn hiệu lực bị ảnh hưởng; không tự hủy lịch</td>
          <td>UC-06 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-06"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> bác sĩ đăng ký lịch nghỉ trong tương lai, hệ thống <span class="kw-shall">PHẢI</span> khóa bác sĩ, kiểm tra giao nhau với mọi lịch hẹn <code>CONFIRMED/CHECKED_IN/IN_PROGRESS</code> và từ chối <code>409</code> nếu xung đột; khi hợp lệ mới lưu <code>time_off</code> và ẩn slot bị che khỏi kết quả tìm kiếm.</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>POST/GET /doctors/{id}/time-off</code>, <code>DELETE /time-off/{id}</code> · <code>ScheduleService.timeOff</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-02, BR-05 · UC-06 · AC-06 · <code>TC-06/08-F</code></div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-06</code>, <code>RG-07</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>timeOffChecksBookingsCommittedAfterItsInitialRead</code> (<code>RG-07</code>), <code>schedule-delete.test.ts</code> (4/4).</div></div>
          </div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/sequence-diagrams/schedule-and-slots.png')"><img src="assets/design/sequence-diagrams/schedule-and-slots.png" alt=""><span>Sequence M03: Lịch nghỉ RG-07</span></div>
          </div>
        </div></td></tr>

        <tr class="fr-row" data-id="FR-07" data-module="M03" onclick="toggleFR('FR-07')">
          <td><strong>FR-07</strong><span class="fr-arr" id="arr-FR-07">▸</span></td>
          <td>Tra cứu khung giờ khả dụng</td>
          <td><span class="badge bm3">M03</span></td>
          <td>KHI tìm lịch theo bác sĩ, ngày, chuyên khoa và hình thức khám, trả slot trống theo thời gian thực (đã tối ưu <code>p95 = 7,81 ms</code>)</td>
          <td>UC-07 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-07"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> người dùng có vai trò vận hành (<code>PATIENT</code>, <code>DOCTOR</code>, <code>RECEPTIONIST</code>, <code>ADMINISTRATOR</code>) tra cứu slot, hệ thống <span class="kw-shall">PHẢI</span> chặn <code>AUDITOR</code> thuần (403) và trả tối đa 500 slot trống trong tương lai loại trừ <code>time_off</code> và lịch hẹn hiệu lực (dùng chỉ mục <code>V10</code>/<code>V11</code> và lọc cửa sổ phẳng trong <code>ScheduleService.slots</code>).</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>GET /slots?date=&amp;doctorId=&amp;specialtyId=&amp;mode=</code> · <code>ScheduleService.slots</code> · <code>V10</code>, <code>V11</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-01, BR-02 · UC-07 · AC-07 · NFR-01</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-07</code>, <code>RG-03</code>, <code>AGENT-TC-020</code>, <code>AGENT-TC-023</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>catalogReadsRequireAnOperationalRole</code> (<code>RG-03</code>, đã sửa BE-02/03), <code>BusinessRulesUnitTest</code>, k6 NFR-01 đạt <strong><code>p95 = 7,81 ms</code></strong> (nhanh hơn 578&times; so với trước tối ưu).</div></div>
          </div>
          <div class="mermaid-wrap"><div class="mermaid">
sequenceDiagram
  actor U as Vai trò vận hành
  participant API as ScheduleController
  participant SVC as ScheduleService
  participant DB as MySQL (V10/V11)

  U-&gt;&gt;API: GET /api/slots?date=YYYY-MM-DD
  API-&gt;&gt;API: requireSchedulingCatalogRead() (chặn AUDITOR 403)
  API-&gt;&gt;SVC: slots(doctor, date, mode, specialty)
  SVC-&gt;&gt;DB: 1. SELECT slot WHERE start_at trong ngày (ix_slot_start_at)
  SVC-&gt;&gt;DB: 2. SELECT time_off &amp; appointment hoạt động trong cửa sổ ngày
  SVC-&gt;&gt;SVC: Lọc giao nhau O(N) trong bộ nhớ (giới hạn 500)
  SVC--&gt;&gt;U: 200 Danh sách slot trống
          </div></div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/sequence-diagrams/schedule-and-slots.png')"><img src="assets/design/sequence-diagrams/schedule-and-slots.png" alt=""><span>Sequence M03: Tối ưu NFR-01 (7,81 ms)</span></div>
          </div>
        </div></td></tr>

        <!-- M04 -->
        <tr class="fr-row" data-id="FR-08" data-module="M04" onclick="toggleFR('FR-08')">
          <td><strong>FR-08</strong><span class="fr-arr" id="arr-FR-08">▸</span></td>
          <td>Đặt lịch hẹn nguyên tử</td>
          <td><span class="badge bm4">M04</span></td>
          <td>KHI đặt slot trống kèm <code>Idempotency-Key</code>, tạo <code>CONFIRMED</code>, chống trùng bác sĩ &amp; bệnh nhân và xếp thông báo trong cùng giao dịch</td>
          <td>UC-08 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-08"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> bệnh nhân đặt khung giờ trống trong tương lai kèm <code>Idempotency-Key</code>, hệ thống <span class="kw-shall">PHẢI</span> kiểm tra bản ghi phát lại (TTL <code>86.400 s</code>), khóa <code>Doctor</code> rồi <code>Patient</code> (<code>FOR UPDATE</code>), kiểm tra không trùng lịch bác sĩ hoặc bệnh nhân, lưu <code>CONFIRMED</code>, ghi audit và xếp <code>notification_job</code> trong cùng giao dịch.</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>POST /appointments</code> (header <code>Idempotency-Key</code>) · <code>AppointmentService.book</code>, <code>Idempotency.java</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-03, BR-04, BR-11, BR-16 · UC-08 · AC-08 · NFR-01, NFR-02, NFR-09</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-08</code>, <code>TC-N01/B01/A01/A02</code>, <code>TC-N05</code>, <code>AGENT-TC-001</code>, <code>AGENT-TC-023</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>SchedulingIntegrationTest</code>, <code>k6 appointment-contention.js</code> (1 thành công / 99 trả 409), NFR-01 <code>POST /appointments p95 = 12,04 ms</code>, <code>booking-offline.test.tsx</code>.</div></div>
          </div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/sequence-diagrams/book-appointment.png')"><img src="assets/design/sequence-diagrams/book-appointment.png" alt=""><span>Sequence: Đặt lịch</span></div>
            <div class="fr-diag-thumb" onclick="lb('assets/design/activity-diagrams/booking.png')"><img src="assets/design/activity-diagrams/booking.png" alt=""><span>Activity: Đặt lịch</span></div>
            <div class="fr-diag-thumb" onclick="lb('assets/design/state-diagrams/appointment.png')"><img src="assets/design/state-diagrams/appointment.png" alt=""><span>State: Lịch hẹn</span></div>
          </div>
        </div></td></tr>

        <tr class="fr-row" data-id="FR-09" data-module="M04" onclick="toggleFR('FR-09')">
          <td><strong>FR-09</strong><span class="fr-arr" id="arr-FR-09">▸</span></td>
          <td>Đổi lịch hẹn (&ge;2 giờ trước giờ khám)</td>
          <td><span class="badge bm4">M04</span></td>
          <td>NẾU <code>CONFIRMED</code> VÀ còn &ge;7.200s, cập nhật khung giờ và tăng <code>version</code> nguyên tử; thất bại giữ nguyên lịch cũ</td>
          <td>UC-09 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-09"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">NẾU</span> lịch <code>CONFIRMED</code> thuộc bệnh nhân, khớp <code>version</code> và thời điểm hiện tại &le; <code>start - 7200 s</code>, hệ thống <span class="kw-shall">PHẢI</span> khóa bác sĩ tăng dần theo <code>TreeSet</code> rồi khóa bệnh nhân, xác minh slot mới khả dụng và cập nhật <code>version+1</code>; mọi lỗi xung đột hoặc quá hạn đều hoàn tác giữ nguyên lịch cũ.</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>POST /appointments/{id}/reschedule</code> · <code>AppointmentService.reschedule</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-03, BR-04, BR-08 · UC-09 · AC-09 · TC-09/10-C</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-09</code>, <code>TC-N02/B02/A03/A04/A05</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>SchedulingIntegrationTest</code>, <code>scripts/smoke.py</code> trên stack Docker.</div></div>
          </div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/sequence-diagrams/change-appointment.png')"><img src="assets/design/sequence-diagrams/change-appointment.png" alt=""><span>Sequence: Đổi lịch</span></div>
            <div class="fr-diag-thumb" onclick="lb('assets/design/state-diagrams/appointment.png')"><img src="assets/design/state-diagrams/appointment.png" alt=""><span>State: Lịch hẹn</span></div>
          </div>
        </div></td></tr>

        <tr class="fr-row" data-id="FR-10" data-module="M04" onclick="toggleFR('FR-10')">
          <td><strong>FR-10</strong><span class="fr-arr" id="arr-FR-10">▸</span></td>
          <td>Hủy lịch hẹn &amp; vô hiệu hóa nhắc cũ</td>
          <td><span class="badge bm4">M04</span></td>
          <td>NẾU <code>CONFIRMED</code> VÀ còn &ge;7.200s, lưu lý do, chuyển <code>CANCELLED</code>, tăng <code>version</code> và ngăn nhắc lịch cũ gửi tiếp</td>
          <td>UC-10 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-10"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">NẾU</span> lịch <code>CONFIRMED</code> thuộc bệnh nhân và còn &ge;2 giờ trước giờ bắt đầu, hệ thống <span class="kw-shall">PHẢI</span> yêu cầu lý do (1–1000 ký tự), chuyển <code>CANCELLED</code>, tăng <code>version+1</code> (làm tác vụ nhắc cũ tự bỏ qua khi worker đối chiếu), ghi audit và xếp email xác nhận hủy.</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>POST /appointments/{id}/cancel</code> · <code>AppointmentService.cancel</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-08, BR-11 · UC-10 · AC-10</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-10</code>, <code>TC-N03/B03/A06</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>SchedulingIntegrationTest</code>, <code>scripts/smoke.py</code> (xác nhận job nhắc lịch cũ bị bỏ qua).</div></div>
          </div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/sequence-diagrams/cancel-appointment.png')"><img src="assets/design/sequence-diagrams/cancel-appointment.png" alt=""><span>Sequence: Hủy lịch</span></div>
          </div>
        </div></td></tr>

        <tr class="fr-row" data-id="FR-11" data-module="M04" onclick="toggleFR('FR-11')">
          <td><strong>FR-11</strong><span class="fr-arr" id="arr-FR-11">▸</span></td>
          <td>Xem &amp; Cập nhật tiến trình lịch hẹn</td>
          <td><span class="badge bm4">M04</span></td>
          <td>KHI cập nhật tiến trình, chỉ chấp nhận chuyển trạng thái và vai trò hợp lệ theo BR-07/BR-08; đồng bộ nguyên tử Encounter &amp; Ticket</td>
          <td>UC-11 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-11"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> người dùng xem lịch hoặc nhân sự cập nhật tiến trình (<code>IN_PROGRESS</code>, <code>COMPLETED</code>, <code>NO_SHOW</code>), hệ thống <span class="kw-shall">PHẢI</span> lọc bản ghi theo vai trò/sở hữu, chỉ cho phép chuyển trạng thái đúng đồ thị <code>IN_PERSON</code>/<code>REMOTE</code> và đồng bộ nguyên tử cùng <code>Encounter</code>, <code>QueueTicket</code> hoặc <code>TelehealthSession</code>.</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>GET /appointments</code>, <code>GET /appointments/{id}</code>, <code>POST /appointments/{id}/progress</code> · <code>WorkflowService.java</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-07, BR-08, BR-15 · UC-11 · AC-11 · AC-11-D/E</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-11</code>, <code>TC-11-D</code>, <code>TC-11-E</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>SchedulingIntegrationTest</code>, <code>scripts/smoke.py</code>. *(Luồng khám hoàn tất E2E xuyên UI tiếp tục là mục kiểm tra bổ sung.)*</div></div>
          </div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/sequence-diagrams/consultation-progress.png')"><img src="assets/design/sequence-diagrams/consultation-progress.png" alt=""><span>Sequence: Tiến trình khám</span></div>
            <div class="fr-diag-thumb" onclick="lb('assets/design/activity-diagrams/consultation.png')"><img src="assets/design/activity-diagrams/consultation.png" alt=""><span>Activity: Quy trình khám</span></div>
          </div>
        </div></td></tr>

        <!-- M05 -->
        <tr class="fr-row" data-id="FR-12" data-module="M05" onclick="toggleFR('FR-12')">
          <td><strong>FR-12</strong><span class="fr-arr" id="arr-FR-12">▸</span></td>
          <td>Lịch sử lâm sàng &amp; Audit READ fail-closed</td>
          <td><span class="badge bm5">M05</span></td>
          <td>KHI bác sĩ có quan hệ điều trị hoặc bệnh nhân chính chủ đọc lịch sử, ghi audit trước khi trả bản được phép</td>
          <td>UC-12 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-12"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> bác sĩ có quan hệ điều trị hoặc bệnh nhân chính chủ truy vấn bệnh án/đơn thuốc, hệ thống <span class="kw-shall">PHẢI</span> ghi nhận nhật ký kiểm toán đọc thành công trước khi trả dữ liệu (lỗi audit → hoàn tác 503); bệnh nhân chỉ được xem bản <code>FINAL</code> và đơn <code>ISSUED</code> của mình.</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>GET /encounters/{id}/record</code>, <code>/encounters/{id}/prescriptions</code>, <code>/patients/{id}/records</code>, <code>/patients/{id}/prescriptions</code> · <code>ClinicalService.java</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-01, BR-09, BR-13, BR-16 · UC-12 · AC-12 · NFR-03, NFR-05</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-12</code>, <code>TC-N08/A12</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>SchedulingIntegrationTest</code> (kiểm tra quyền, audit READ và từ chối chéo).</div></div>
          </div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/sequence-diagrams/medical-record.png')"><img src="assets/design/sequence-diagrams/medical-record.png" alt=""><span>Sequence: Hồ sơ lâm sàng</span></div>
          </div>
        </div></td></tr>

        <tr class="fr-row" data-id="FR-13" data-module="M05" onclick="toggleFR('FR-13')">
          <td><strong>FR-13</strong><span class="fr-arr" id="arr-FR-13">▸</span></td>
          <td>Ghi, Chốt FINAL &amp; Bổ sung hồ sơ khám</td>
          <td><span class="badge bm5">M05</span></td>
          <td>Lưu <code>DRAFT</code>/<code>FINAL</code> mã hóa AES-GCM theo khóa lạc quan <code>version</code>; bản <code>FINAL</code> bất biến; bổ sung tạo bản mới có lý do</td>
          <td>UC-13 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-13"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> bác sĩ phụ trách lưu hồ sơ (<code>&le;100.000</code> ký tự, mã hóa AES-256-GCM), hệ thống <span class="kw-shall">PHẢI</span> kiểm tra <code>v_req == v_db</code> (lệch trả 409) và giữ bản đã chốt <code>FINAL</code> bất biến. Khi cần sửa sau <code>FINAL</code>, lệnh bổ sung tạo bản <code>FINAL</code> mới tham chiếu bản gần nhất và ghi lý do dưới khóa Encounter.</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>PUT /encounters/{id}/record</code>, <code>POST /records/{id}/amendments</code> (+ <code>Idempotency-Key</code>) · <code>ClinicalService.java</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-09, BR-10 · UC-13 · AC-13 · AC-13-D · NFR-04</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-13</code>, <code>TC-N05/B05/A08</code>, <code>TC-13-D</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>SchedulingIntegrationTest</code>, <code>clinical-flow.test.tsx</code> (3/3 PASS: phục hồi draft, chốt final, amendment).</div></div>
          </div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/state-diagrams/medical-record.png')"><img src="assets/design/state-diagrams/medical-record.png" alt=""><span>State: Hồ sơ bệnh án</span></div>
          </div>
        </div></td></tr>

        <tr class="fr-row" data-id="FR-14" data-module="M05" onclick="toggleFR('FR-14')">
          <td><strong>FR-14</strong><span class="fr-arr" id="arr-FR-14">▸</span></td>
          <td>Kê và Phát hành đơn thuốc</td>
          <td><span class="badge bm5">M05</span></td>
          <td>KHI phát hành đơn (<code>ISSUED</code>), yêu cầu &ge;1 dòng thuốc đủ 5 trường bắt buộc (<code>422</code> nếu thiếu) và khóa bất biến</td>
          <td>UC-14 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-14"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> bác sĩ phát hành đơn thuốc, hệ thống <span class="kw-shall">PHẢI</span> bắt buộc có ít nhất 1 dòng thuốc đủ <code>medicineName</code>, <code>doseText</code>, <code>route</code>, <code>frequency</code>, <code>durationText</code> (mỗi trường 1–1000 ký tự), chuyển sang <code>ISSUED</code> bất biến kèm người lập, thời điểm và audit (một encounter hỗ trợ nhiều đơn).</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>POST /encounters/{id}/prescriptions</code>, <code>PUT /prescriptions/{id}</code>, <code>POST /prescriptions/{id}/issue</code> · <code>ClinicalService.java</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-09, BR-10 · UC-14 · AC-14</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-14</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>SchedulingIntegrationTest</code>, <code>clinical-flow.test.tsx</code> (sửa draft bằng PUT thay vì tạo đơn trùng, retry 503 giữ key).</div></div>
          </div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/sequence-diagrams/prescription.png')"><img src="assets/design/sequence-diagrams/prescription.png" alt=""><span>Sequence: Kê đơn thuốc</span></div>
          </div>
        </div></td></tr>

        <!-- M06 -->
        <tr class="fr-row" data-id="FR-15" data-module="M06" onclick="toggleFR('FR-15')">
          <td><strong>FR-15</strong><span class="fr-arr" id="arr-FR-15">▸</span></td>
          <td>Nhắc lịch hẹn qua Email (Outbox)</td>
          <td><span class="badge bm6">M06</span></td>
          <td>KHI đến mốc trước 30 phút (<code>1.800 s</code>), gửi Email nội dung tối thiểu nếu lịch còn <code>CONFIRMED</code> và đúng phiên bản</td>
          <td>UC-15 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-15"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> đến thời điểm <code>start - 1800 s</code> (nếu đặt trước mốc 30 phút), bộ xử lý nền (<code>NotificationWorker</code>, lease <code>60 s</code>) <span class="kw-shall">PHẢI</span> đối chiếu lại trạng thái <code>CONFIRMED</code> và <code>appointment_version</code> trước khi gửi email nội dung tối thiểu (không chẩn đoán, đơn thuốc hay token) qua SMTP.</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>GET /notification-jobs</code> · <code>NotificationStore.java</code>, <code>NotificationWorker.java</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-11, BR-12 · UC-15 · AC-15 · NFR-12</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-15</code>, <code>TC-15/16-C</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>SchedulingIntegrationTest</code>, <code>scripts/smoke.py</code> qua Mailpit (kiểm chứng gửi nhắc 30p và bỏ job cũ khi hủy/đổi lịch).</div></div>
          </div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/sequence-diagrams/notifications.png')"><img src="assets/design/sequence-diagrams/notifications.png" alt=""><span>Sequence: Outbox Thông báo</span></div>
          </div>
        </div></td></tr>

        <tr class="fr-row" data-id="FR-16" data-module="M06" onclick="toggleFR('FR-16')">
          <td><strong>FR-16</strong><span class="fr-arr" id="arr-FR-16">▸</span></td>
          <td>Thử lại lỗi SMTP có giới hạn &amp; Theo dõi</td>
          <td><span class="badge bm6">M06</span></td>
          <td>NẾU SMTP lỗi tạm thời, thử lại tối đa 3 lần sau <code>1 / 5 / 15 phút</code> rồi đánh <code>FAILED</code> mà không hoàn tác lịch hẹn</td>
          <td>UC-16 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-16"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">NẾU</span> nhà cung cấp SMTP gặp lỗi tạm thời, hệ thống <span class="kw-shall">PHẢI</span> thử lại theo lịch trễ <code>&Delta; = [60, 300, 900] s</code> tối đa 3 lần (đối chiếu lại trạng thái lịch trước mỗi lần thử), đánh dấu <code>FAILED</code> khi quá hạn và tuyệt đối không hoàn tác giao dịch lịch hẹn đã commit.</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>GET /notification-jobs</code> · <code>NotificationStore.markFailedOrRetry</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-11 · UC-16 · AC-16 · NFR-07</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-16</code>, <code>TC-15/16-C</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>SchedulingIntegrationTest</code> (xác minh lịch retry 1/5/15 phút, chuyển <code>FAILED</code> và bảo toàn lịch hẹn).</div></div>
          </div>
        </div></td></tr>

        <!-- M07 -->
        <tr class="fr-row" data-id="FR-17" data-module="M07" onclick="toggleFR('FR-17')">
          <td><strong>FR-17</strong><span class="fr-arr" id="arr-FR-17">▸</span></td>
          <td>Ghi nhật ký kiểm toán fail-closed</td>
          <td><span class="badge bm7">M07</span></td>
          <td>KHI đọc/ghi dữ liệu nhạy cảm, đổi quyền hoặc từ chối truy cập, PHẢI ghi audit kèm <code>X-Request-Id</code> không chứa PHI/token</td>
          <td>UC-17 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-17"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> phát sinh thao tác đọc/ghi dữ liệu nhạy cảm, đổi quyền, khóa tài khoản hoặc bị từ chối phòng từ xa (<code>DENIED</code>), hệ thống <span class="kw-shall">PHẢI</span> ghi sự kiện kiểm toán (tác nhân hoặc <code>SYSTEM</code>, thao tác, tài nguyên, thời điểm, <code>X-Request-Id</code>) theo nguyên tắc fail-closed (lỗi ghi audit thì hoàn tác/không trả dữ liệu).</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>Audit.java</code>, <code>RequestCorrelation.java</code> · kích hoạt từ mọi Service được bảo vệ</div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-12, BR-13, BR-16 · UC-17 · AC-17 · NFR-05, NFR-12</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-17</code>, <code>TC-A14</code>, <code>RG-01</code>, <code>AGENT-TC-015</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>deniedTelehealthJoinPersistsOnlyAudit</code> (<code>RG-01</code>, đã sửa dứt điểm BE-01), <code>SchedulingIntegrationTest</code> (fault injection rollback), <code>PatientAccountIntegrationTest</code>.</div></div>
          </div>
          <div class="mermaid-wrap"><div class="mermaid">
sequenceDiagram
  actor A as Tác nhân
  participant F as RequestCorrelation
  participant SVC as Service (@Transactional)
  participant AUD as Audit
  participant DB as MySQL (audit_event)

  A-&gt;&gt;F: Request kèm Bearer JWT
  F-&gt;&gt;SVC: Gắn X-Request-Id
  SVC-&gt;&gt;DB: Nghiệp vụ nhạy cảm / Đọc bệnh án
  SVC-&gt;&gt;AUD: audit.record(actorId, action, resource)
  alt Lưu audit thất bại
    DB--&gt;&gt;SVC: Lỗi DB
    SVC-&gt;&gt;DB: ROLLBACK (Fail-closed, trả 503)
  else Thành công / DENIED từ xa
    AUD-&gt;&gt;DB: INSERT audit_event (không PHI, có X-Request-Id)
    SVC--&gt;&gt;A: Trả kết quả + header X-Request-Id
  end
          </div></div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/sequence-diagrams/audit-fail-closed.png')"><img src="assets/design/sequence-diagrams/audit-fail-closed.png" alt=""><span>Sequence M07: Audit Fail-Closed &amp; DENIED (RG-01)</span></div>
          </div>
        </div></td></tr>

        <tr class="fr-row" data-id="FR-18" data-module="M07" onclick="toggleFR('FR-18')">
          <td><strong>FR-18</strong><span class="fr-arr" id="arr-FR-18">▸</span></td>
          <td>Tra cứu &amp; Bảo vệ nhật ký kiểm toán</td>
          <td><span class="badge bm7">M07</span></td>
          <td>KHI <code>AUDITOR</code> tìm nhật ký theo thời gian/tác nhân/tài nguyên, trả danh sách phân trang và cấm UPDATE/DELETE từ ứng dụng</td>
          <td>UC-18 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-18"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> Kiểm toán viên lọc nhật ký kiểm toán theo <code>from</code>, <code>to</code> (exclusive UTC), <code>actorId</code>, <code>resourceId</code>, hệ thống <span class="kw-shall">PHẢI</span> trả danh sách phân trang (tối đa 100/trang), cấm tài khoản ứng dụng sửa/xóa bản ghi <code>audit_event</code> ở tầng CSDL và cô lập phạm vi quyền <code>AUDITOR</code> (không đọc được catalog khám).</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>GET /audit-events</code> · <code>AuditController.java</code>, <code>Audit.java</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-01, BR-12, BR-13 · UC-18 · AC-18 · NFR-05</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-18</code>, <code>RG-03</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>SchedulingIntegrationTest</code> (xác minh quyền đọc audit, lọc phân trang, chặn UPDATE/DELETE và cô lập <code>AUDITOR</code> <code>RG-03</code>).</div></div>
          </div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/sequence-diagrams/audit-fail-closed.png')"><img src="assets/design/sequence-diagrams/audit-fail-closed.png" alt=""><span>Sequence M07: Tra cứu Audit &amp; Trigger bất biến</span></div>
          </div>
        </div></td></tr>

        <!-- M08 -->
        <tr class="fr-row" data-id="FR-19" data-module="M08" onclick="toggleFR('FR-19')">
          <td><strong>FR-19</strong><span class="fr-arr" id="arr-FR-19">▸</span></td>
          <td>Check-in &amp; Cấp phiếu chờ nguyên tử</td>
          <td><span class="badge bm8">M08</span></td>
          <td>KHI check-in lịch <code>IN_PERSON</code> <code>CONFIRMED</code> trong <code>[T−15p, T+15p)</code>, tạo 1 phiếu <code>WAITING</code> ở <code>MAX+1</code> và chuyển <code>CHECKED_IN</code></td>
          <td>UC-19 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-19"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> lễ tân check-in lịch trực tiếp <code>CONFIRMED</code> trong cửa sổ <code>[start - 900 s, start + 900 s)</code>, hệ thống <span class="kw-shall">PHẢI</span> khóa bản ghi <code>Doctor</code>, chuyển lịch sang <code>CHECKED_IN</code> và cấp đúng một phiếu <code>WAITING</code> ở vị trí <code>MAX(position)+1</code> (gửi trùng hoặc chạy đồng thời dùng lại chính phiếu đó).</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>POST /appointments/{id}/check-in</code> · <code>WorkflowService.checkIn</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-06, BR-07, BR-08 · UC-19 · AC-19 · TC-19-C</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-19</code>, <code>TC-N04/B04/A07</code>, <code>RG-10</code>, <code>RG-11</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>checkInHasExactTimeBoundariesAndRoleChecks</code>, <code>checkInReusesATicketCommittedAfterItsInitialRead</code> (<code>RG-10</code>), <code>checkInAppendsAfterTicketsCommittedAfterItsInitialRead</code> (<code>RG-11</code>).</div></div>
          </div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/sequence-diagrams/checkin-and-queue.png')"><img src="assets/design/sequence-diagrams/checkin-and-queue.png" alt=""><span>Sequence: Check-in &amp; Hàng đợi</span></div>
            <div class="fr-diag-thumb" onclick="lb('assets/design/state-diagrams/queue-ticket.png')"><img src="assets/design/state-diagrams/queue-ticket.png" alt=""><span>State: Phiếu chờ</span></div>
          </div>
        </div></td></tr>

        <tr class="fr-row" data-id="FR-20" data-module="M08" onclick="toggleFR('FR-20')">
          <td><strong>FR-20</strong><span class="fr-arr" id="arr-FR-20">▸</span></td>
          <td>Gọi lượt tiếp theo FIFO</td>
          <td><span class="badge bm8">M08</span></td>
          <td>KHI gọi tiếp, chọn phiếu <code>WAITING</code> đầu hàng của bác sĩ/ngày dưới khóa <code>Doctor</code>; hàng rỗng trả <code>204</code></td>
          <td>UC-20 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-20"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> bác sĩ phụ trách hoặc lễ tân gọi lượt tiếp theo trong ngày, hệ thống <span class="kw-shall">PHẢI</span> khóa <code>Doctor</code> để bảo đảm tại một thời điểm chỉ có tối đa 1 phiếu <code>CALLED/IN_SERVICE</code>, lấy phiếu <code>WAITING</code> có <code>position</code> nhỏ nhất chuyển sang <code>CALLED</code>; nếu hàng rỗng trả <code>204 No Content</code> và ghi cache idempotency.</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>GET /doctors/{id}/queue?date=</code>, <code>POST /doctors/{id}/queue/next?date=</code> · <code>WorkflowService.callNext</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-06 · UC-20 · AC-20 · NFR-02</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-20</code>, <code>RG-04</code>, <code>RG-12</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>emptyQueueResultReplaysWithoutCallingNewlyCheckedInPatient</code> (<code>RG-04</code>, đã sửa BE-04 trả 204), <code>nextDoesNotCallASecondTicketAfterAnotherRequestCommitsACall</code> (<code>RG-12</code>).</div></div>
          </div>
        </div></td></tr>

        <tr class="fr-row" data-id="FR-21" data-module="M08" onclick="toggleFR('FR-21')">
          <td><strong>FR-21</strong><span class="fr-arr" id="arr-FR-21">▸</span></td>
          <td>Bỏ lượt và đặt cuối hàng đợi</td>
          <td><span class="badge bm8">M08</span></td>
          <td>KHI bỏ lượt phiếu đang <code>CALLED</code>, ghi lý do, đặt lại trạng thái <code>WAITING</code> ở vị trí <code>MAX+1</code> và giữ nguyên ID phiếu</td>
          <td>UC-21 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-21"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> bác sĩ hoặc lễ tân bỏ lượt một phiếu đang <code>CALLED</code> kèm lý do hợp lệ và đúng <code>version</code>, hệ thống <span class="kw-shall">PHẢI</span> giữ nguyên <code>ticket.id</code>, cập nhật lại <code>status = WAITING</code> và cấp vị trí mới <code>MAX(position)+1</code> ở cuối hàng cùng audit (từ chối nếu đã vào <code>IN_SERVICE</code>).</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>POST /queue-tickets/{id}/skip</code> (<code>{reason, version}</code> + key) · <code>WorkflowService.skipTicket</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-06 · UC-21 · AC-21 · AC-19/21-D</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-21</code>, <code>TC-19/21-D</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>SchedulingIntegrationTest</code> (xác minh giữ ticket ID, cấp <code>MAX+1</code> dưới khóa Doctor và chặn bỏ lượt khi đang khám).</div></div>
          </div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/sequence-diagrams/skip-ticket.png')"><img src="assets/design/sequence-diagrams/skip-ticket.png" alt=""><span>Sequence: Bỏ lượt</span></div>
          </div>
        </div></td></tr>

        <!-- M09 -->
        <tr class="fr-row" data-id="FR-22" data-module="M09" onclick="toggleFR('FR-22')">
          <td><strong>FR-22</strong><span class="fr-arr" id="arr-FR-22">▸</span></td>
          <td>Chuẩn bị phiên khám từ xa</td>
          <td><span class="badge bm9">M09</span></td>
          <td>KHI lịch <code>REMOTE</code> đến cửa sổ <code>[T−10p, T+15p)</code>, tạo hoặc lấy đúng 1 phiên duy nhất gắn lịch</td>
          <td>UC-22 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-22"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> chủ lịch từ xa hoặc bác sĩ phụ trách mở phòng chờ trong cửa sổ <code>[start - 600 s, start + 900 s)</code>, hệ thống <span class="kw-shall">PHẢI</span> tạo (hoặc trả lại idempotent) đúng 1 phiên <code>telehealth_session</code>; bác sĩ &amp; bệnh nhân lấy cấu hình STUN/TURN 3478 (<code>Cache-Control: no-store</code>) để kiểm tra thiết bị trước khi vào gọi.</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>POST/GET /appointments/{id}/telehealth-session</code>, <code>GET /telehealth-sessions/{id}</code>, <code>GET /webrtc/ice</code> · <code>TelehealthService.java</code>, <code>ice-config.mjs</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-14 · UC-22 · AC-22 · NFR-13</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-22</code>, <code>TC-22/23-C</code>, <code>AGENT-TC-018</code>, <code>AGENT-TC-019</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>SchedulingIntegrationTest</code>, <code>telehealth-lifecycle.test.tsx</code>, <code>test_webrtc_turn_config.py</code>, xác minh thật trên VM (<code>coturn</code> 3478 + <code>/api/webrtc/ice</code> 401 <code>no-store</code>).</div></div>
          </div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/sequence-diagrams/telehealth.png')"><img src="assets/design/sequence-diagrams/telehealth.png" alt=""><span>Sequence: Telehealth</span></div>
            <div class="fr-diag-thumb" onclick="lb('assets/design/state-diagrams/telehealth.png')"><img src="assets/design/state-diagrams/telehealth.png" alt=""><span>State: Phiên từ xa</span></div>
          </div>
        </div></td></tr>

        <tr class="fr-row" data-id="FR-23" data-module="M09" onclick="toggleFR('FR-23')">
          <td><strong>FR-23</strong><span class="fr-arr" id="arr-FR-23">▸</span></td>
          <td>Tham gia phiên &amp; Cấp token phòng ngắn hạn</td>
          <td><span class="badge bm9">M09</span></td>
          <td>KHI join/start, xác minh danh tính + đồng ý + trạng thái trước khi cấp token phòng <code>TTL 300 s</code>; người ngoài bị 404 + audit <code>DENIED</code></td>
          <td>UC-23 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-23"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> bệnh nhân (<code>consent=true</code>) hoặc bác sĩ yêu cầu vào phòng (<code>join</code>) hay bác sĩ bắt đầu phiên (<code>start</code> trong <code>[start, start+900s)</code>), hệ thống <span class="kw-shall">PHẢI</span> kiểm tra quyền, thu hồi token cũ của người đó và cấp room token ngắn hạn (<code>300 s</code>), trao đổi tín hiệu SDP/ICE giới hạn <code>&le;65.536</code> ký tự và <code>&le;300 tin/phút</code>; người ngoài biết ID phiên nhận 404 kèm audit <code>DENIED</code>.</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>POST /telehealth-sessions/{id}/join</code>, <code>/start</code>, <code>GET/POST /signals</code> (header <code>X-Room-Token</code>) · <code>TelehealthService.java</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-14 · UC-23 · AC-23 · NFR-03, NFR-13</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-23</code>, <code>RG-01</code>, <code>AGENT-TC-019</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>deniedTelehealthJoinPersistsOnlyAudit</code> (<code>RG-01</code>), <code>npm run test:rtc</code> (2/2 Playwright WebRTC media hai phía, renew token), <code>webrtc.test.ts</code> (14/14).</div></div>
          </div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/activity-diagrams/telehealth-consultation.png')"><img src="assets/design/activity-diagrams/telehealth-consultation.png" alt=""><span>Activity: Khám từ xa</span></div>
          </div>
        </div></td></tr>

        <tr class="fr-row" data-id="FR-24" data-module="M09" onclick="toggleFR('FR-24')">
          <td><strong>FR-24</strong><span class="fr-arr" id="arr-FR-24">▸</span></td>
          <td>Mất kết nối, Nối lại &amp; Kết thúc phiên từ xa</td>
          <td><span class="badge bm9">M09</span></td>
          <td>NẾU rớt mạng, giữ nguyên hồ sơ và cho nối lại (<code>ICE restart</code>, audio-only) khi phiên còn mở; kết thúc (<code>ENDED</code>) thu hồi token/signal</td>
          <td>UC-24 · <span class="badge bstat-ok">Đạt (theo giới hạn P2P)</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-24"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">NẾU</span> luồng âm thanh/hình ảnh gián đoạn khi phiên còn <code>ACTIVE/RECONNECTING</code>, hệ thống <span class="kw-shall">PHẢI</span> giữ nguyên bệnh án đã lưu và cho phép nối lại (kể cả sau mốc +15 phút) bằng token mới, hỗ trợ <code>ICE restart</code> và chế độ chỉ âm thanh. Khi bác sĩ bấm kết thúc (<code>ENDED</code>), hệ thống thu hồi token/tín hiệu, chặn cấp mới và từ chối callback trễ.</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>POST /telehealth-sessions/{id}/connection</code>, <code>POST /end</code> · <code>TelehealthService.java</code>, <code>TelehealthRoom.tsx</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-14, BR-15 · UC-24 · AC-24 · AC-24-D *(AC-24-E ngoài kiến trúc P2P)*</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-24</code>, <code>TC-24-D/F</code>, <code>TC-N06</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>npm run test:rtc</code> (mute, ICE restart, renew token, kết thúc &amp; audio-only fallback), <code>SchedulingIntegrationTest</code>, <code>doctor-call-navigation.test.tsx</code> (2/2), nhóm đã thử nghiệm trên điện thoại.</div></div>
          </div>
        </div></td></tr>

        <!-- FR-25..27 Mở rộng -->
        <tr class="fr-row" data-id="FR-25" data-module="M06" onclick="toggleFR('FR-25')">
          <td><strong>FR-25</strong><span class="fr-arr" id="arr-FR-25">▸</span></td>
          <td>Báo chậm giờ khám (<code>DELAY_NOTICE</code>)</td>
          <td><span class="badge bm6">M06</span></td>
          <td>KHI lễ tân báo chậm cho lịch hợp lệ cùng ngày VN, tạo tối đa 1 tác vụ email/version (giờ dự kiến tùy chọn); giữ nguyên giờ hẹn</td>
          <td>UC-25 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-25"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> lễ tân báo chậm cho lịch cùng ngày VN đủ điều kiện (<code>CONFIRMED</code> trước <code>start+900s</code> hoặc <code>CHECKED_IN</code> trực tiếp), hệ thống <span class="kw-shall">PHẢI</span> giữ nguyên giờ hẹn và trạng thái chính thức, tạo tối đa 1 tác vụ email <code>DELAY_NOTICE</code> cho phiên bản lịch đó (kèm giờ dự kiến &gt; <code>max(start, now)</code> nếu có) và bỏ qua khi lịch đổi phiên bản.</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>POST /appointments/{id}/delay-notice</code> · <code>AppointmentDelayPolicy.java</code>, <code>AppointmentService.java</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-11, BR-17 · UC-25 · AC-25</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-25</code>, <code>AGENT-TC-020</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>SchedulingIntegrationTest</code> + <code>BusinessRulesUnitTest</code> (<code>appointmentDelayPolicyCoversConfirmedCheckedInAndDayBoundaries</code>).</div></div>
          </div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/sequence-diagrams/delay-and-noshow.png')"><img src="assets/design/sequence-diagrams/delay-and-noshow.png" alt=""><span>Sequence: Báo chậm giờ</span></div>
          </div>
        </div></td></tr>

        <tr class="fr-row" data-id="FR-26" data-module="M04 M06" onclick="toggleFR('FR-26')">
          <td><strong>FR-26</strong><span class="fr-arr" id="arr-FR-26">▸</span></td>
          <td>Ghi nhận vắng hẹn (<code>NO_SHOW</code>) &amp; lời mời đặt lại</td>
          <td><span class="badge bm4">M04</span> <span class="badge bm6">M06</span></td>
          <td>TỪ mốc <code>start + 15 phút</code> trên lịch <code>CONFIRMED</code>, lưu <code>NO_SHOW</code> + lý do, tùy chọn gửi email mời đặt lại; giữ nguyên quyền tài khoản</td>
          <td>UC-26 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-26"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> người phụ trách (Lễ tân cho trực tiếp, Bác sĩ cho từ xa) ghi nhận vắng hẹn cho lịch <code>CONFIRMED</code> từ mốc <code>start + 900 s</code>, hệ thống <span class="kw-shall">PHẢI</span> lưu mã lý do (<code>PATIENT_ABSENT</code>, <code>COULD_NOT_CONTACT</code>, <code>TECHNICAL_ISSUE</code>, <code>OTHER</code>), hủy phiên từ xa <code>CREATED/WAITING</code> nếu có, chỉ xếp email mời đặt lại (<code>NO_SHOW_REBOOKING</code>) khi được chọn (không lộ lý do) và từ chối nếu đã check-in.</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>POST /appointments/{id}/progress</code> (<code>targetStatus: "NO_SHOW"</code>) · <code>WorkflowService.java</code>, <code>NoShowReason.java</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-08, BR-12, BR-18 · UC-26 · AC-26</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-26</code>, <code>TC-22-D</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>SchedulingIntegrationTest</code> (xác minh quyền theo mode, mốc +15p, chặn sau check-in và tùy chọn email mời).</div></div>
          </div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/sequence-diagrams/delay-and-noshow.png')"><img src="assets/design/sequence-diagrams/delay-and-noshow.png" alt=""><span>Sequence: Vắng hẹn NO_SHOW</span></div>
            <div class="fr-diag-thumb" onclick="lb('assets/design/state-diagrams/appointment.png')"><img src="assets/design/state-diagrams/appointment.png" alt=""><span>State: Vòng đời Lịch hẹn</span></div>
          </div>
        </div></td></tr>

        <tr class="fr-row" data-id="FR-27" data-module="M01 M07" onclick="toggleFR('FR-27')">
          <td><strong>FR-27</strong><span class="fr-arr" id="arr-FR-27">▸</span></td>
          <td>Tra cứu chính xác &amp; Khóa/Mở khóa tài khoản bệnh nhân</td>
          <td><span class="badge bm1">M01</span> <span class="badge bm7">M07</span></td>
          <td>Tra chính xác UUID/email/SĐT qua blind index HMAC tách khóa (cấm tìm tên, 409 trùng SĐT); trả 3 trường tối thiểu &amp; khóa tức thì</td>
          <td>UC-27 · <span class="badge bstat-ok">Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-FR-27"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><span class="kw-ears">KHI</span> Quản trị viên tra cứu chính xác tài khoản bệnh nhân theo UUID, email hoặc số điện thoại chuẩn hóa (<code>+84</code>/<code>84</code> &rarr; <code>0</code>, 7–15 chữ số) qua blind index <code>K_hmac</code>, hệ thống <span class="kw-shall">PHẢI</span> chặn tìm theo tên (<code>400</code>), chặn tài khoản nhân sự (<code>404</code>), trả <code>409</code> nếu nhiều tài khoản dùng chung SĐT, chỉ trả <code>{id, displayName, active}</code> kèm audit. Khóa/mở khóa cần lý do, ghi audit và chặn token hiện hành ngay lập tức.</p>
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">API &amp; Thành phần</div><div class="ev-val"><code>GET /patient-accounts/lookup?q=</code>, <code>GET /patient-accounts/{id}</code>, <code>PUT /patient-accounts/{id}/access</code> · <code>Access.java</code>, <code>V8</code></div></div>
            <div class="ev-card"><div class="ev-label">Quy tắc &amp; Tiêu chí</div><div class="ev-val">BR-13, BR-19 · UC-27 · AC-27 · NFR-03, NFR-04, NFR-05</div></div>
            <div class="ev-card"><div class="ev-label">Ca kiểm thử</div><div class="ev-val"><code>TC-27</code>, <code>TC-27-B</code>, <code>AGENT-TC-015</code></div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng đạt</div><div class="ev-val"><code>PatientAccountIntegrationTest</code> (MySQL 8.4 CI <code>#43</code>: kiểm chứng đủ 400/403/404/409/200, khóa/mở khóa và audit), <code>patient-accounts.test.tsx</code> (2/2 PASS).</div></div>
          </div>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/sequence-diagrams/patient-account-admin.png')"><img src="assets/design/sequence-diagrams/patient-account-admin.png" alt=""><span>Sequence: Tra cứu HMAC &amp; Khóa TK</span></div>
          </div>
          <div class="mermaid-wrap"><div class="mermaid">
sequenceDiagram
  actor AD as Quản trị viên
  participant API as AuthController
  participant SVC as Access &amp; Crypto
  participant DB as MySQL (user_account)
  participant AUD as Audit

  AD-&gt;&gt;API: GET /api/patient-accounts/lookup?q=...
  API-&gt;&gt;SVC: Chuẩn hóa UUID / email / SĐT (+84 &rarr; 0)
  alt Chuỗi tên hoặc sai định dạng
    SVC--&gt;&gt;AD: 400 Invalid identifier
  else Tính K_hmac blind index
    SVC-&gt;&gt;DB: SELECT id, display_name, active WHERE staff=FALSE AND hash=?
    alt Khớp &ge; 2 tài khoản (trùng SĐT gia đình)
      DB--&gt;&gt;AD: 409 Ambiguous phone (yêu cầu nhập UUID)
    else Khớp 1 bệnh nhân
      SVC-&gt;&gt;AUD: Ghi audit PATIENT_ACCOUNT_LOOKUP
      SVC--&gt;&gt;AD: 200 {id, displayName, active}
    end
  end
          </div></div>
        </div></td></tr>

      </tbody>
    </table>
  </div>
</section>

<section class="section" id="nfr">
  <div class="sh"><span class="sh-ic">📐</span><div class="sh-txt"><h2>Yêu cầu phi chức năng (16 NFR — 16/16 Đạt)</h2><p>Bao gồm NFR-01..NFR-12 gốc và NFR-13..NFR-16 bổ sung theo ISO/IEC 25010:2023 để bao quát WebRTC/TURN, Tiếp cận/Responsive, Chống lạm dụng đa tầng &amp; An toàn phát hành</p></div></div>

  <div class="filter-bar">
    <input type="search" class="search-in" placeholder="Tìm theo mã NFR, chất lượng, công cụ kiểm chứng..." oninput="setSearchFilter('nfr', this.value)">
    <div class="chip-group">
      <button type="button" class="chip active" onclick="setModuleFilter('nfr','ALL',this)">Tất cả (16)</button>
      <button type="button" class="chip" onclick="setModuleFilter('nfr','PERF',this)">Hiệu năng &amp; Đồng thời</button>
      <button type="button" class="chip" onclick="setModuleFilter('nfr','SEC',this)">Bảo mật &amp; Chống lạm dụng</button>
      <button type="button" class="chip" onclick="setModuleFilter('nfr','REL',this)">Tin cậy &amp; Video/UI</button>
      <button type="button" class="chip" onclick="setModuleFilter('nfr','PROC',this)">Công nghệ &amp; Quy trình</button>
    </div>
    <button type="button" class="btn-mini" onclick="toggleAllDetails('nfr', true)">Mở tất cả</button>
    <button type="button" class="btn-mini" onclick="toggleAllDetails('nfr', false)">Thu gọn</button>
    <span class="filter-count" id="count-nfr">Hiển thị 16 / 16 mục</span>
  </div>

  <div class="tbl-wrap">
    <table>
      <thead><tr><th>Mã</th><th>Thuộc tính chất lượng</th><th>Ngưỡng định lượng</th><th>Bằng chứng xác minh thực tế</th><th>Trạng thái</th></tr></thead>
      <tbody>

        <tr class="fr-row" data-id="NFR-01" data-module="PERF" onclick="toggleFR('NFR-01')">
          <td><strong>NFR-01</strong><span class="fr-arr" id="arr-NFR-01">▸</span></td>
          <td>Hiệu năng &amp; Tải chuẩn</td>
          <td><code>p95 &le; 2.000 ms</code> (50 VU, 10.000 lịch, 15 phút đọc + ghi); <code>ERR &lt; 1%</code></td>
          <td>Run <code>44931759747</code> (<code>12740a9</code>): <strong>70.270 req · p95 = 9,37 ms</strong> (<code>slots 7,81 ms</code>, <code>book 12,04 ms</code>) · <strong>0% lỗi</strong></td>
          <td><span class="badge bstat-ok">✓ Đạt (vượt ngưỡng)</span></td>
        </tr>
        <tr class="fr-detail" id="detail-NFR-01"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full">Kiểm chứng bằng workflow <code>.github/workflows/nfr01-load-test.yml</code> + <code>scripts/nfr01-load-harness.py</code> + <code>tests/k6/nfr01-full-load.js</code> trên MySQL 8.4 thật với 10.000 lịch hẹn quá khứ và 240 slot tương lai, 50 VU riêng biệt chạy liên tục 15 phút đọc + ghi.</p>
          <div class="tbl-wrap bench-table"><table>
            <thead><tr><th>Chỉ số (50 VU &times; 15m &times; 10.000 lịch)</th><th>Trước tối ưu (<code>55286a9</code>)</th><th>Sau tối ưu (<code>12740a9</code>)</th><th>Cải thiện</th></tr></thead>
            <tbody>
              <tr><td>Tổng thể HTTP <code>p95</code></td><td class="metric-bad">4.320 ms</td><td class="metric-good">9,37 ms</td><td>Nhanh hơn 461&times;</td></tr>
              <tr><td><code>GET /api/slots</code> <code>p95</code></td><td class="metric-bad">4.520 ms</td><td class="metric-good">7,81 ms</td><td>Nhanh hơn 578&times;</td></tr>
              <tr><td><code>POST /api/appointments</code> <code>p95</code></td><td class="metric-bad">3.720 ms</td><td class="metric-good">12,04 ms</td><td>Nhanh hơn 309&times;</td></tr>
              <tr><td>Tổng requests &amp; Checks</td><td>16.912 req (100% check)</td><td class="metric-good">70.270 req · 105.330/105.330 (100%) · 0% lỗi</td><td>Gấp 4,15&times;</td></tr>
            </tbody>
          </table></div>
        </div></td></tr>

        <tr class="fr-row" data-id="NFR-02" data-module="PERF" onclick="toggleFR('NFR-02')">
          <td><strong>NFR-02</strong><span class="fr-arr" id="arr-NFR-02">▸</span></td>
          <td>Nhất quán &amp; Chống trùng đồng thời</td>
          <td>100 request đồng thời cùng slot &rarr; đúng <strong>1 thành công</strong> / 99 trả <code>409</code>; 0 lịch trùng bác sĩ/bệnh nhân</td>
          <td><code>k6 appointment-contention.js</code> (1/99) + <code>SchedulingIntegrationTest</code> (<code>RG-05..12</code>)</td>
          <td><span class="badge bstat-ok">✓ Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-NFR-02"><td colspan="5"><div class="fr-dcard">
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">Cơ chế kỹ thuật</div><div class="ev-val">Khóa thứ tự <code>Doctor &rarr; Patient</code> (<code>SELECT ... FOR UPDATE</code>), giao dịch <code>READ COMMITTED</code>, chỉ mục <code>ix_doctor_overlap</code> / <code>ix_patient_overlap</code>.</div></div>
            <div class="ev-card"><div class="ev-label">Bằng chứng</div><div class="ev-val">Báo cáo 19/11 (k6 100 VU 1/99) + bộ hồi quy đồng thời MySQL <code>RG-05..RG-12</code> đạt xanh qua CI <code>#43</code>.</div></div>
          </div>
        </div></td></tr>

        <tr class="fr-row" data-id="NFR-03" data-module="SEC" onclick="toggleFR('NFR-03')">
          <td><strong>NFR-03</strong><span class="fr-arr" id="arr-NFR-03">▸</span></td>
          <td>Phân quyền vai trò &amp; Tài nguyên</td>
          <td>Mọi API nhạy cảm kiểm tra vai trò từ DB và quan hệ tài nguyên; 0 rò rỉ chéo IDOR</td>
          <td><code>SchedulingIntegrationTest</code>, <code>PatientAccountIntegrationTest</code>, <code>JwtValidationTest</code>, <code>test:auth-runtime</code> (5 vai trò), <code>post-deploy-smoke</code></td>
          <td><span class="badge bstat-ok">✓ Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-NFR-03"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full">Khắc phục toàn bộ điểm thăm dò trước đó (<code>BE-02</code> Lễ tân đọc lịch, <code>BE-03</code> cô lập <code>AUDITOR</code>). Bổ sung thêm <code>guard-redirect.test.tsx</code> (<code>AGENT-TC-017</code>) và chốt <code>GET /api/me/profile &rarr; 401</code> trên bản demo HTTPS sau mỗi lần deploy.</p>
        </div></td></tr>

        <tr class="fr-row" data-id="NFR-04" data-module="SEC" onclick="toggleFR('NFR-04')">
          <td><strong>NFR-04</strong><span class="fr-arr" id="arr-NFR-04">▸</span></td>
          <td>Bảo mật truyền dẫn, Mã hóa &amp; Header</td>
          <td>TLS + HSTS (<code>31536000 s</code>), AES-256-GCM (IV 12B, tag 128b), <code>K_hmac</code> tách khóa, CSP <code>frame-ancestors 'none'</code>, XFO <code>DENY</code></td>
          <td><code>ContactOtpServiceTest</code>, <code>test_security_headers_config.py</code>, <code>verify-live-demo.py</code> HTTPS thật (6/6), <code>AGENT-TC-007/008/009</code></td>
          <td><span class="badge bstat-ok">✓ Đạt *(kèm rủi ro demo)*</span></td>
        </tr>
        <tr class="fr-detail" id="detail-NFR-04"><td colspan="5"><div class="fr-dcard">
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">Mã hóa &amp; Blind Index</div><div class="ev-val"><code>Crypto.java</code> mã hóa AES-256-GCM và dẫn xuất khóa HMAC riêng <code>HMAC-SHA256(K, "cliniccare:blind-index:v1")</code> (kiểm chứng bởi <code>cryptoHashUsesDomainSeparatedKey</code>).</div></div>
            <div class="ev-card"><div class="ev-label">HTTP Security Headers thật</div><div class="ev-val">Caddy + Nginx trả đủ HSTS, CSP, X-Frame-Options DENY, nosniff, Referrer-Policy (xác minh live qua <code>post-deploy-smoke</code>).</div></div>
          </div>
          <p class="formula-note"><strong>Rủi ro đã chấp nhận (Demo):</strong> Fallback <code>DemoClinic</code> trong <code>scripts/prepare-internet.py</code> chỉ dùng cho bản trình diễn dữ liệu giả; Keycloak Admin được khóa bằng mật khẩu ngẫu nhiên.</p>
        </div></td></tr>

        <tr class="fr-row" data-id="NFR-05" data-module="SEC" onclick="toggleFR('NFR-05')">
          <td><strong>NFR-05</strong><span class="fr-arr" id="arr-NFR-05">▸</span></td>
          <td>Nhật ký kiểm toán (Audit Fail-Closed)</td>
          <td>100% thao tác nhạy cảm ghi audit cùng giao dịch; đọc lỗi audit hoàn tác; bảng <code>audit_event</code> append-only</td>
          <td><code>RG-01</code> (audit <code>DENIED</code> mang <code>X-Request-Id</code>), fault injection rollback trong <code>SchedulingIntegrationTest</code>, <code>PatientAccountIntegrationTest</code></td>
          <td><span class="badge bstat-ok">✓ Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-NFR-05"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full">Kiểm thử tiêm lỗi DB (<code>DataAccessResourceFailureException</code>) xác nhận hệ thống từ chối thao tác nhạy cảm và không trả dữ liệu khi ghi nhật ký kiểm toán thất bại; tác vụ nền dùng <code>actorType=SYSTEM</code>, không chứa PHI.</p>
        </div></td></tr>

        <tr class="fr-row" data-id="NFR-06" data-module="REL" onclick="toggleFR('NFR-06')">
          <td><strong>NFR-06</strong><span class="fr-arr" id="arr-NFR-06">▸</span></td>
          <td>Sao lưu &amp; Phục hồi dữ liệu</td>
          <td><code>mysqldump</code> + khôi phục giữ nguyên 100% bản ghi, dữ liệu mã hóa và ràng buộc khóa ngoại</td>
          <td><code>BackupRestoreIntegrationTest</code> (<code>AGENT-TC-021</code>) đạt xanh trên MySQL 8.4 Testcontainers tại CI <code>#43</code> (<code>7c13276</code>)</td>
          <td><span class="badge bstat-ok">✓ Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-NFR-06"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full">Tự động chạy <code>mysqldump --single-transaction --routines --triggers</code> bên trong container MySQL 8.4, restore sang cơ sở dữ liệu sạch <code>clinic_restore_verify</code>, kiểm đếm 6 bảng cốt lõi, giải mã lại <code>email_encrypted</code> AES-GCM, đếm &ge;10 khóa ngoại và kiểm chứng từ chối chèn bản ghi mồ côi.</p>
        </div></td></tr>

        <tr class="fr-row" data-id="NFR-07" data-module="REL" onclick="toggleFR('NFR-07')">
          <td><strong>NFR-07</strong><span class="fr-arr" id="arr-NFR-07">▸</span></td>
          <td>Xử lý lỗi DB &amp; Dịch vụ ngoài</td>
          <td>Không báo thành công sai khi DB/SMTP lỗi; không rò stack trace (<code>ProblemDetail</code>)</td>
          <td>Kiểm thử retry backoff SMTP [1/5/15p], fault injection audit rollback (503), và rollback deploy tự động</td>
          <td><span class="badge bstat-ok">✓ Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-NFR-07"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><code>application.yml</code> cấu hình <code>server.error.include-message: never</code> và <code>include-stacktrace: never</code>; lỗi SMTP không rollback giao dịch lịch; lỗi cấu hình/dịch vụ khi deploy tự động rollback về commit ổn định trước đó.</p>
        </div></td></tr>

        <tr class="fr-row" data-id="NFR-08" data-module="REL" onclick="toggleFR('NFR-08')">
          <td><strong>NFR-08</strong><span class="fr-arr" id="arr-NFR-08">▸</span></td>
          <td>Khả năng sử dụng (Usability)</td>
          <td>&ge; 4/5 bệnh nhân hoàn thành đặt lịch trong &le; 3 phút sau hướng dẫn</td>
          <td><code>TC-N05</code> — Nhóm đã thử nghiệm đặt lịch thực tế trên điện thoại qua bản demo Azure HTTPS</td>
          <td><span class="badge bstat-ok">✓ Đạt *(thử thực tế)*</span></td>
        </tr>
        <tr class="fr-detail" id="detail-NFR-08"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full">Luồng đặt lịch thiết kế gọn 3 bước trên màn hình máy tính và điện thoại. Nhóm xác nhận đã kiểm tra thao tác đặt lịch thực tế trên điện thoại hoàn thành đúng quy trình; biên bản bấm giờ chi tiết từng cá nhân không lưu thành file trong repo (<code>evidence_ref=NOT_RETAINED</code>).</p>
        </div></td></tr>

        <tr class="fr-row" data-id="NFR-09" data-module="REL" onclick="toggleFR('NFR-09')">
          <td><strong>NFR-09</strong><span class="fr-arr" id="arr-NFR-09">▸</span></td>
          <td>Hiển thị lỗi mất mạng UI &amp; Bảo toàn dữ liệu</td>
          <td>Thông báo lỗi trong &le; 10 giây khi mất kết nối; giữ dữ liệu đã chọn/lưu; retry không trùng</td>
          <td><code>frontend/tests/booking-offline.test.tsx</code> (<code>AGENT-TC-001</code>) + <code>npm run test:rtc</code> (2/2) đạt tại CI <code>#43</code></td>
          <td><span class="badge bstat-ok">✓ Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-NFR-09"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full">Kiểm thử Vitest mô phỏng mất kết nối mạng (<code>ApiError status 0</code>) ngay bước xác nhận đặt lịch: xác minh hiển thị cảnh báo trong <code>&lt; 10 s</code> (thực đo vài trăm ms), không báo thành công giả, giữ nguyên bước xác nhận và dùng lại chính xác <code>Idempotency-Key</code> ban đầu khi mạng phục hồi.</p>
        </div></td></tr>

        <tr class="fr-row" data-id="NFR-10" data-module="PROC" onclick="toggleFR('NFR-10')">
          <td><strong>NFR-10</strong><span class="fr-arr" id="arr-NFR-10">▸</span></td>
          <td>Công nghệ chuẩn, OpenAPI 3.1 &amp; Quản lý Git</td>
          <td>React + TS / Spring Boot / MySQL 8.4; OpenAPI 3.1 khớp 100% mã nguồn; UML trong Git</td>
          <td>Job <code>api-contract</code> (<code>openapi_spec_validator</code>) xanh trên CI: 50 đường dẫn / 61 thao tác, phủ đủ <code>FR-01..27</code></td>
          <td><span class="badge bstat-ok">✓ Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-NFR-10"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full"><code>scripts/check-api-contract.py</code> tự động kiểm tra OpenAPI 3.1 YAML so với snapshot <code>/v3/api-docs</code> (<code>openapi.json</code>), kiểm tra tính hợp lệ Draft 2020-12 và truy vết FR trên mỗi release.</p>
        </div></td></tr>

        <tr class="fr-row" data-id="NFR-11" data-module="PROC" onclick="toggleFR('NFR-11')">
          <td><strong>NFR-11</strong><span class="fr-arr" id="arr-NFR-11">▸</span></td>
          <td>Độ bao phủ kiểm thử &amp; Cổng chất lượng CI</td>
          <td><code>LINE &ge; 60%</code> và <code>BRANCH &ge; 60%</code>; có kiểm thử chống trùng &amp; phân quyền</td>
          <td><code>backend/pom.xml</code> bật cổng bắt buộc <code>jacoco:check</code> (&ge;60% dòng &amp; nhánh); 86/86 test đạt xanh CI <code>#43</code></td>
          <td><span class="badge bstat-ok">✓ Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-NFR-11"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full">Bổ sung <code>BusinessRulesUnitTest</code> (<code>AGENT-TC-020</code>: <code>AppointmentDelayPolicy</code>, <code>CatalogService</code>, <code>ClinicHours</code>, <code>Commands</code>, <code>ScheduleService.slots</code>) cùng <code>ContactOtpServiceTest</code> (5/5) và bật <code>jacoco:check</code> chặn build nếu độ bao phủ dòng hoặc nhánh xuống dưới 60%.</p>
        </div></td></tr>

        <tr class="fr-row" data-id="NFR-12" data-module="SEC" onclick="toggleFR('NFR-12')">
          <td><strong>NFR-12</strong><span class="fr-arr" id="arr-NFR-12">▸</span></td>
          <td>Dữ liệu giả &amp; Bảo vệ log / Email</td>
          <td>100% dữ liệu mô phỏng; không lộ bệnh án, mật khẩu, token trong Email hoặc log kỹ thuật</td>
          <td><code>PatientAccountIntegrationTest</code> (3 trường tối thiểu), <code>ContactOtpServiceTest</code>, <code>test_internet_demo_passwords.py</code></td>
          <td><span class="badge bstat-ok">✓ Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-NFR-12"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full">Audit từ chối, email nhắc lịch/OTP và response tra cứu bệnh nhân không bao giờ chứa chẩn đoán, đơn thuốc, JWT hay mật khẩu; toàn bộ dữ liệu demo tạo bởi <code>DemoData.java</code> là dữ liệu mô phỏng.</p>
        </div></td></tr>

        <tr class="fr-row" data-id="NFR-13" data-module="REL" onclick="toggleFR('NFR-13')">
          <td><strong>NFR-13</strong><span class="fr-arr" id="arr-NFR-13">▸</span></td>
          <td>Truyền thông Video WebRTC &amp; Máy chủ TURN</td>
          <td>DTLS-SRTP; credential TURN HMAC có TTL (3600s); <code>ICE restart</code> + audio-only; <code>coturn</code> quota <code>4/32</code> &amp; chặn IP nội bộ</td>
          <td><code>test:rtc</code> (2/2) + <code>test_webrtc_turn_config.py</code> + kiểm chứng live VM: <code>coturn 3478</code> UDP/TCP &amp; thử thực tế điện thoại</td>
          <td><span class="badge bstat-ok">✓ Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-NFR-13"><td colspan="5"><div class="fr-dcard">
          <div class="ev-grid">
            <div class="ev-card"><div class="ev-label">Xác minh máy ảo Azure thật</div><div class="ev-val">Probe RFC 5389 STUN tới <code>20.187.80.11:3478</code> phản hồi <code>Binding Success (0x0101, 40B)</code> trên cả UDP &amp; TCP; <code>GET /api/webrtc/ice</code> trả <code>401</code> + <code>Cache-Control: no-store</code>.</div></div>
            <div class="ev-card"><div class="ev-label">Bảo mật &amp; Trải nghiệm</div><div class="ev-val"><code>coturn</code> khóa toàn bộ dải private IP (<code>10/8</code>, <code>127/8</code>, <code>172.16/12</code>, <code>192.168/16</code>, <code>169.254/16</code>); nhóm đã thử gọi thực tế qua điện thoại.</div></div>
          </div>
        </div></td></tr>

        <tr class="fr-row" data-id="NFR-14" data-module="REL" onclick="toggleFR('NFR-14')">
          <td><strong>NFR-14</strong><span class="fr-arr" id="arr-NFR-14">▸</span></td>
          <td>Hiển thị đáp ứng &amp; Tiếp cận (<code>axe</code>)</td>
          <td>0 lỗi tràn ngang, 0 lỗi console ở desktop &amp; mobile; 0 vi phạm quy tắc <code>axe</code> trên mọi vai trò</td>
          <td><code>npm run test:scan</code> (10/10): 52 lượt viewport sạch 100%, 26 lượt desktop <code>axe</code> đạt 0 vi phạm</td>
          <td><span class="badge bstat-ok">✓ Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-NFR-14"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full">Playwright tự động quét 26 cặp vai trò &times; màn hình ở hai kích thước desktop và mobile (52 lượt đo), xác minh tính tương thích đa thiết bị trước khi triển khai bản demo.</p>
        </div></td></tr>

        <tr class="fr-row" data-id="NFR-15" data-module="SEC" onclick="toggleFR('NFR-15')">
          <td><strong>NFR-15</strong><span class="fr-arr" id="arr-NFR-15">▸</span></td>
          <td>Chống lạm dụng &amp; Giới hạn tần suất đa tầng</td>
          <td>Keycloak khóa 5 lần sai (<code>60–900 s</code>); OTP cooldown <code>30 s</code> &amp; <code>5/h/email</code>; Nginx <code>10r/m/IP</code> trả <code>429</code></td>
          <td><code>ContactOtpServiceTest</code> (5/5), <code>PatientAccountIntegrationTest</code>, <code>test_azure_google_oauth.py</code>, <code>test_security_headers_config.py</code></td>
          <td><span class="badge bstat-ok">✓ Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-NFR-15"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full">Phòng thủ 3 lớp: (1) Gateway Nginx giới hạn IP gọi <code>POST /api/me/contact/otp</code> (<code>10r/m</code>, <code>burst=5</code>, HTTP 429); (2) Backend chặn theo <code>actorId</code> (30s) và theo <code>targetEmailHash</code> qua mọi tài khoản (30s &amp; 5/3600s trong <code>V9</code>); (3) IdP Keycloak khóa tạm khi đoán sai mật khẩu.</p>
        </div></td></tr>

        <tr class="fr-row" data-id="NFR-16" data-module="PROC" onclick="toggleFR('NFR-16')">
          <td><strong>NFR-16</strong><span class="fr-arr" id="arr-NFR-16">▸</span></td>
          <td>An toàn phát hành &amp; Phục hồi triển khai</td>
          <td>Vượt qua cổng CI 3 job; lỗi deploy tự động rollback về <code>prev_sha</code>; 100% smoke test sau deploy (6/6)</td>
          <td><code>deploy-azure-demo.yml</code> (CI <code>#39</code>, <code>#43</code> xanh 5/5 job), <code>test_azure_deploy_scope.py</code> (rollback), <code>verify-live-demo.py</code></td>
          <td><span class="badge bstat-ok">✓ Đạt</span></td>
        </tr>
        <tr class="fr-detail" id="detail-NFR-16"><td colspan="5"><div class="fr-dcard">
          <p class="fr-desc-full">Mỗi bản đẩy lên <code>main</code> chạy song song <code>frontend</code> + <code>backend</code> + <code>api-contract</code> rồi mới deploy. Trên Azure VM, <code>scripts/deploy-azure-demo.sh</code> tối ưu theo phạm vi (<code>docs-only</code> / <code>frontend-only</code> / <code>full</code>), tự <code>git reset --hard prev_sha</code> và dựng lại bản cũ nếu health check lỗi, rồi chạy <code>post-deploy-smoke</code> xác nhận 6 chốt HTTPS/header/OIDC/TURN trong ~9 giây.</p>
          <div class="fr-diag-row">
            <div class="fr-diag-thumb" onclick="lb('assets/design/activity-diagrams/cicd-azure-rollback.png')"><img src="assets/design/activity-diagrams/cicd-azure-rollback.png" alt=""><span>Activity NFR-16: CI/CD Azure VM &amp; Tự động Rollback</span></div>
            <div class="fr-diag-thumb" onclick="lb('assets/design/architecture/deployment-azure.png')"><img src="assets/design/architecture/deployment-azure.png" alt=""><span>Kiến trúc Azure VM Demo</span></div>
          </div>
        </div></td></tr>

      </tbody>
    </table>
  </div>
</section>

<section class="section" id="br">
  <div class="sh"><span class="sh-ic">⚖️</span><div class="sh-txt"><h2>Quy tắc nghiệp vụ (19 Quy tắc BR-01..BR-19)</h2><p>Áp dụng ở tầng nghiệp vụ và CSDL bất kể vai trò hay giao diện · Đồng bộ 100% với <code>docs/requirements/business-rules.md</code></p></div></div>

  <div class="filter-bar">
    <input type="search" class="search-in" placeholder="Tìm theo mã BR hoặc nội dung quy tắc..." oninput="setSearchFilter('br', this.value)">
    <div class="chip-group">
      <button type="button" class="chip active" onclick="setModuleFilter('br','ALL',this)">Tất cả (19)</button>
      <button type="button" class="chip" onclick="setModuleFilter('br','M01',this)">M01/M07</button>
      <button type="button" class="chip" onclick="setModuleFilter('br','M03',this)">M02/M03</button>
      <button type="button" class="chip" onclick="setModuleFilter('br','M04',this)">M04/M08</button>
      <button type="button" class="chip" onclick="setModuleFilter('br','M05',this)">M05</button>
      <button type="button" class="chip" onclick="setModuleFilter('br','M06',this)">M06</button>
      <button type="button" class="chip" onclick="setModuleFilter('br','M09',this)">M09</button>
    </div>
    <span class="filter-count" id="count-br">Hiển thị 19 / 19 mục</span>
  </div>

  <div class="tbl-wrap">
    <table>
      <thead><tr><th>Mã</th><th>Phân hệ</th><th>Nội dung quy tắc nghiệp vụ</th></tr></thead>
      <tbody>
        <tr class="plain-row" data-module="M01"><td><strong>BR-01</strong></td><td><span class="badge bm1">M01/M07</span></td><td>Xác thực không thay thế phân quyền. Mọi yêu cầu phải kiểm tra vai trò từ CSDL và quan hệ sở hữu với tài nguyên.</td></tr>
        <tr class="plain-row" data-module="M03"><td><strong>BR-02</strong></td><td><span class="badge bm3">M03/M04</span></td><td>Dùng khoảng nửa mở <code>[start, end)</code>, <code>start &lt; end</code>; các khoảng kề nhau không trùng. Lưu <code>DATETIME(6)</code> UTC; giao diện hiển thị <code>Asia/Ho_Chi_Minh</code>.</td></tr>
        <tr class="plain-row" data-module="M04"><td><strong>BR-03</strong></td><td><span class="badge bm4">M04</span></td><td>Một bác sĩ và một bệnh nhân không có hai lịch còn hiệu lực trùng thời gian; dùng khóa giao dịch tuần tự hóa tránh tranh chấp đồng thời.</td></tr>
        <tr class="plain-row" data-module="M03 M04"><td><strong>BR-04</strong></td><td><span class="badge bm4">M03/M04</span></td><td>Đặt/đổi lịch phải tái kiểm tra lịch trống trong giao dịch; đổi thất bại giữ nguyên lịch cũ không mất suất.</td></tr>
        <tr class="plain-row" data-module="M03"><td><strong>BR-05</strong></td><td><span class="badge bm2">M02/M03</span></td><td>Không ngừng hoạt động bác sĩ, sửa giờ/lễ hay tạo lịch nghỉ làm ảnh hưởng lịch đang có; phải chặn 409 trước khi cập nhật.</td></tr>
        <tr class="plain-row" data-module="M04"><td><strong>BR-06</strong></td><td><span class="badge bm8">M08</span></td><td>Check-in chỉ cho lịch trực tiếp <code>CONFIRMED</code> (tối đa 1 phiếu/lịch); gọi <strong>FIFO</strong> theo bác sĩ/ngày; bỏ lượt chuyển cùng phiếu về cuối hàng.</td></tr>
        <tr class="plain-row" data-module="M04"><td><strong>BR-07</strong></td><td><span class="badge bm4">M04</span></td><td>Chuỗi trạng thái chuẩn: Lịch trực tiếp <code>CONFIRMED &rarr; CHECKED_IN &rarr; IN_PROGRESS &rarr; COMPLETED</code>; Lịch từ xa <code>CONFIRMED &rarr; IN_PROGRESS &rarr; COMPLETED</code>.</td></tr>
        <tr class="plain-row" data-module="M04"><td><strong>BR-08</strong></td><td><span class="badge bm4">M04</span></td><td>Chỉ <code>CONFIRMED</code> và còn &ge; 2 giờ trước giờ hẹn được đổi/hủy; <code>NO_SHOW</code> chỉ ghi nhận từ mốc +15 phút; <code>COMPLETED/CANCELLED/NO_SHOW</code> là kết thúc.</td></tr>
        <tr class="plain-row" data-module="M05"><td><strong>BR-09</strong></td><td><span class="badge bm5">M05</span></td><td>Chỉ bác sĩ phụ trách được ghi/phát hành hồ sơ; bản <code>FINAL</code> bất biến. Bản bổ sung tạo bản <code>FINAL</code> mới tham chiếu bản trước kèm lý do.</td></tr>
        <tr class="plain-row" data-module="M05"><td><strong>BR-10</strong></td><td><span class="badge bm5">M05</span></td><td>Mỗi lịch hẹn ứng với tối đa 1 lần khám; phát hành đơn yêu cầu &ge; 1 dòng thuốc đủ 5 trường; không tự đề xuất thuốc hoặc liều dùng.</td></tr>
        <tr class="plain-row" data-module="M06"><td><strong>BR-11</strong></td><td><span class="badge bm6">M06</span></td><td>Gửi thông báo sau commit; lỗi SMTP không hoàn tác lịch. Worker kiểm tra lại version và trạng thái trước khi gửi để bỏ tác vụ lỗi thời.</td></tr>
        <tr class="plain-row" data-module="M01 M06"><td><strong>BR-12</strong></td><td><span class="badge bm6">M06/M07</span></td><td>Không đưa chẩn đoán, nội dung đơn thuốc, room token hay JWT vào Email hoặc nhật ký kỹ thuật.</td></tr>
        <tr class="plain-row" data-module="M01"><td><strong>BR-13</strong></td><td><span class="badge bm7">M07</span></td><td>Sự kiện kiểm toán gồm tác nhân (hoặc <code>SYSTEM</code>), thao tác, mã tài nguyên, thời điểm, kết quả và <code>X-Request-Id</code>; không lưu bệnh án.</td></tr>
        <tr class="plain-row" data-module="M09"><td><strong>BR-14</strong></td><td><span class="badge bm9">M09</span></td><td>Chỉ bệnh nhân và bác sĩ đúng lịch được vào phiên từ xa hợp lệ; room token ngắn hạn (<code>300 s</code>) gắn chặt phiên và người tham gia.</td></tr>
        <tr class="plain-row" data-module="M09 M05"><td><strong>BR-15</strong></td><td><span class="badge bm9">M09/M05</span></td><td>Mất luồng hình ảnh/âm thanh không tự hoàn tất khám; kết thúc phiên (<code>ENDED</code>), chốt bệnh án (<code>FINAL</code>) và hoàn tất ca là các thao tác tách biệt.</td></tr>
        <tr class="plain-row" data-module="M01"><td><strong>BR-16</strong></td><td><span class="badge bm7">M07</span></td><td>Audit thao tác ghi lưu trong cùng giao dịch; đọc dữ liệu nhạy cảm phải lưu audit thành công trước khi trả dữ liệu (fail-closed).</td></tr>
        <tr class="plain-row" data-module="M06"><td><strong>BR-17</strong></td><td><span class="badge bm6">M06</span></td><td>Báo chậm giữ nguyên giờ hẹn &amp; trạng thái chính thức; tối đa 1 tác vụ mỗi version lịch; bỏ qua khi lịch thay đổi version trước lúc gửi.</td></tr>
        <tr class="plain-row" data-module="M04 M06"><td><strong>BR-18</strong></td><td><span class="badge bm4">M04/M06</span></td><td>Ghi nhận <code>NO_SHOW</code> từ +15 phút (lễ tân với trực tiếp, bác sĩ với từ xa); giữ nguyên quyền đăng nhập tài khoản; email mời đặt lại là tùy chọn.</td></tr>
        <tr class="plain-row" data-module="M01"><td><strong>BR-19</strong></td><td><span class="badge bm1">M01/M07</span></td><td>Quản trị tra cứu chính xác tài khoản bệnh nhân qua UUID/email/SĐT (blind index HMAC, <code>409</code> khi trùng SĐT gia đình); trả 3 trường tối thiểu; khóa tức thì cả JWT đang sống.</td></tr>
      </tbody>
    </table>
  </div>

  <div class="alert alert-info" style="margin-top:14px">
    <span>🔄</span>
    <div><strong>Đồng bộ vòng đời:</strong> Phiếu chờ <code>WAITING &rarr; CALLED &rarr; IN_SERVICE &rarr; DONE</code> (<code>CALLED &rarr; WAITING</code> khi bỏ lượt cuối hàng). Phiên từ xa <code>CREATED &rarr; WAITING &rarr; ACTIVE &rarr; ENDED</code> (<code>RECONNECTING &harr; ACTIVE</code>; <code>CREATED/WAITING &rarr; CANCELLED</code> khi <code>NO_SHOW</code>). Hoàn tất lần khám yêu cầu hồ sơ <code>FINAL</code> và phiên từ xa <code>ENDED</code> (nếu là khám từ xa).</div>
  </div>
</section>

<section class="section" id="formulas">
  <div class="sh"><span class="sh-ic">🧮</span><div class="sh-txt"><h2>Công thức &amp; Lượng hóa hàm nghiệp vụ</h2><p>Đối chiếu trực tiếp từ <code>docs/design/business-formulas-and-quantification.md</code> và các lớp xử lý trong <code>backend/src/main/java</code></p></div></div>

  <div class="formula-grid">
    <div class="formula-card">
      <h4><span>1. Định danh, Mã hóa &amp; Blind Index</span><span class="badge bm1">M01/M07</span></h4>
      <div class="formula-src"><code>Access.java</code> · <code>Crypto.java</code></div>
      <div class="formula-expr">userId = UUIDv3(UTF8(issuer + "|" + subject))
C = IV_12 || E_{K, GCM}(IV_12, P) || Tag_16   (|Tag| = 128 bit)
K_hmac = HMAC-SHA256(K, "cliniccare:blind-index:v1")
h(x) = hex_lower(HMAC-SHA256(K_hmac, norm(x)))  in {0-9a-f}^64</div>
      <div class="formula-note">Tách khóa <code>K_hmac</code> khỏi khóa mã hóa AES-256-GCM; chuẩn hóa SĐT <code>+84/84(&ge;11) &rarr; 0</code> dài 7–15 chữ số; tra cứu khớp &ge;2 người trả <code>409</code>.</div>
    </div>

    <div class="formula-card">
      <h4><span>2. OTP 6 số &amp; Khóa tạm Brute-force</span><span class="badge bm1">M01</span></h4>
      <div class="formula-src"><code>ContactOtpService.java</code> · <code>V9__contact_otp.sql</code> · Keycloak</div>
      <div class="formula-expr">h_otp = h(actorId + "|" + norm_email(e) + "|" + code_6)
P(&le;5 lần thử) = 1 - prod_{i=0..4}(1 - 1/(10^6 - i)) &le; 5 &times; 10^-6
W(k) = min(60 * floor(k / 5), 900) giây   (k &ge; 5 trong 900 s)</div>
      <div class="formula-note">OTP TTL <code>300 s</code>, cooldown <code>30 s</code>, giới hạn <code>5 lượt/3600 s/email</code> và Nginx <code>10 req/phút/IP</code> (HTTP 429). Đặt lại MK qua email xóa bộ đếm khóa.</div>
    </div>

    <div class="formula-card">
      <h4><span>3. Giờ khám hiệu lực &amp; Sinh Slot</span><span class="badge bm3">M03</span></h4>
      <div class="formula-src"><code>ScheduleService.java</code> · <code>ClinicHours.java</code></div>
      <div class="formula-expr">Overlap([s1,e1), [s2,e2)) &lt;=&gt; (s1 &lt; e2) &amp;&amp; (e1 &gt; s2)
H_eff(D) = Holiday(D) ưu tiên trên ClinicHours(dow(D))
N = (e - s) / (60 * d),   I_i = [s + 60di, s + 60d(i+1))</div>
      <div class="formula-note">Mặc định <code>08:00–17:00</code> (T2–T7, UTC+7), slot mặc định <code>d = 20</code> phút. Truy vấn ngày quá khứ trả <code>[]</code> ngay; ngày hợp lệ qua index <code>V10</code>/<code>V11</code>.</div>
    </div>

    <div class="formula-card">
      <h4><span>4. Cửa sổ Lịch hẹn &amp; Idempotency</span><span class="badge bm4">M04/M06</span></h4>
      <div class="formula-src"><code>AppointmentService.java</code> · <code>AppointmentDelayPolicy.java</code></div>
      <div class="formula-expr">CanModify(a, t) &lt;=&gt; status=CONFIRMED &amp;&amp; t &le; start - 7200 s
CanMarkNoShow(a, t) &lt;=&gt; status=CONFIRMED &amp;&amp; t &ge; start + 900 s
t_reminder = start - 1800 s;   Retry &Delta; = [60, 300, 900] s (k &le; 3)
Idempotency TTL = 86.400 s  (key + body SHA-256 khác &rarr; HTTP 409)</div>
      <div class="formula-note">Cấm đổi/hủy trong vòng 2 giờ; báo chậm <code>DELAY_NOTICE</code> giữ nguyên giờ hẹn; lỗi SMTP thử lại tối đa 3 lần với lease <code>60 s</code>.</div>
    </div>

    <div class="formula-card">
      <h4><span>5. Khóa lạc quan, Hàng đợi FIFO &amp; Telehealth</span><span class="badge bm8">M05/M08/M09</span></h4>
      <div class="formula-src"><code>ClinicalService.java</code> · <code>WorkflowService.java</code> · <code>TelehealthService.java</code></div>
      <div class="formula-expr">WriteAllowed: v_req = v_db =&gt; v_next = v_db + 1  (lệch &rarr; 409)
pos_new(doctor, D_VN) = max({pos_j} U {0}) + 1   (khóa Doctor)
Check-in: [start - 900 s, start + 900 s) | Chờ video: [-600 s, +900 s)
Room Token TTL = 300 s | TURN quota: 4/user, 32/total | Signals &le; 300/60 s</div>
      <div class="formula-note">Bỏ lượt giữ nguyên <code>ticket.id</code> và cấp <code>pos_new</code>; <code>TransientDataCleanup</code> chạy mỗi <code>60 s</code> dọn token, signal, idempotency, OTP hết hạn.</div>
    </div>

    <div class="formula-card">
      <h4><span>6. Chỉ số Lượng hóa Đánh giá Chất lượng (NFR)</span><span class="badge bm9">NFR-01..16</span></h4>
      <div class="formula-src"><code>nfr01-load-harness.py</code> · <code>backend/pom.xml</code> · <code>verify-live-demo.py</code></div>
      <div class="formula-expr">p95 = T_ceil(0.95 * N) &le; 2.000 ms   (thực đo: 9,37 ms tổng · 7,81 ms slots)
ERR = N_err / N_total * 100% = 0,00%   (tranh chấp k6: 1/99 = 100% đúng)
Cov_line, Cov_branch &ge; 60% (jacoco:check CI) | Smoke_pass = 6/6 = 100%</div>
      <div class="formula-note">Thỏa mãn đồng thời độ bao phủ tự động trong CI và độ trễ phân vị 95 trên bộ tải 50 VU / 10.000 lịch / 15 phút đọc + ghi.</div>
    </div>
  </div>
</section>

<section class="section" id="review-matrix">
  <div class="sh"><span class="sh-ic">🔍</span><div class="sh-txt"><h2>Ma trận Rà soát Tổng thể (27 FR &times; Thiết kế &times; Kiểm chứng)</h2><p>Công cụ đối chiếu nhanh khi bảo vệ đồ án — liên kết trực tiếp từng yêu cầu tới quy tắc, API, ca kiểm thử và bằng chứng</p></div></div>

  <div class="filter-bar">
    <input type="search" class="search-in" placeholder="Lọc nhanh theo FR, API, UC, AC, tên bài test..." oninput="setSearchFilter('review-matrix', this.value)">
    <div class="chip-group">
      <button type="button" class="chip active" onclick="setModuleFilter('review-matrix','ALL',this)">Tất cả (27)</button>
      <button type="button" class="chip" onclick="setModuleFilter('review-matrix','M01',this)">M01</button>
      <button type="button" class="chip" onclick="setModuleFilter('review-matrix','M02',this)">M02</button>
      <button type="button" class="chip" onclick="setModuleFilter('review-matrix','M03',this)">M03</button>
      <button type="button" class="chip" onclick="setModuleFilter('review-matrix','M04',this)">M04</button>
      <button type="button" class="chip" onclick="setModuleFilter('review-matrix','M05',this)">M05</button>
      <button type="button" class="chip" onclick="setModuleFilter('review-matrix','M06',this)">M06</button>
      <button type="button" class="chip" onclick="setModuleFilter('review-matrix','M07',this)">M07</button>
      <button type="button" class="chip" onclick="setModuleFilter('review-matrix','M08',this)">M08</button>
      <button type="button" class="chip" onclick="setModuleFilter('review-matrix','M09',this)">M09</button>
    </div>
    <span class="filter-count" id="count-review-matrix">Hiển thị 27 / 27 mục</span>
  </div>

  <div class="tbl-wrap">
    <table>
      <thead><tr><th>FR</th><th>Phân hệ</th><th>BR · UC · AC</th><th>Endpoint / Thành phần thực thi</th><th>Ca kiểm thử &amp; Bằng chứng thực tế</th></tr></thead>
      <tbody>
        <tr class="plain-row" data-module="M01"><td><strong>FR-01</strong></td><td><span class="badge bm1">M01</span></td><td>BR-01,12 · UC-01 · AC-01</td><td><code>/me</code>, <code>/me/profile</code>, <code>/me/contact/otp</code>, <code>/me/contact</code></td><td><code>ContactOtpServiceTest</code> (5/5), <code>PatientAccountIntegrationTest</code> (CI #43), <code>account-page.test.tsx</code>, <code>test_azure_google_oauth.py</code></td></tr>
        <tr class="plain-row" data-module="M01"><td><strong>FR-02</strong></td><td><span class="badge bm1">M01</span></td><td>BR-01,13,16 · UC-02 · AC-02</td><td><code>/users</code>, <code>/users/{id}/roles</code>, <code>Guard.tsx</code></td><td><code>SchedulingIntegrationTest</code>, <code>JwtValidationTest</code> (5/5), <code>guard-redirect.test.tsx</code> (2/2)</td></tr>
        <tr class="plain-row" data-module="M02"><td><strong>FR-03</strong></td><td><span class="badge bm2">M02</span></td><td>BR-01,05 · UC-03 · AC-03</td><td><code>/specialties</code>, <code>/doctors</code>, <code>/staff/provision</code></td><td><code>CatalogService</code> + <code>BusinessRulesUnitTest</code>, <code>StaffProvisioningIntegrationTest</code> (2/2), <code>specialties-ui.test.tsx</code></td></tr>
        <tr class="plain-row" data-module="M02"><td><strong>FR-04</strong></td><td><span class="badge bm2">M02</span></td><td>BR-05 · UC-04 · AC-04</td><td><code>PUT /doctors/{id}</code></td><td><code>RG-08</code>, <code>RG-09</code>, <code>BusinessRulesUnitTest</code></td></tr>
        <tr class="plain-row" data-module="M03"><td><strong>FR-05</strong></td><td><span class="badge bm3">M03</span></td><td>BR-02,04,05 · UC-05 · AC-05</td><td><code>/clinic/hours</code>, <code>/clinic/holidays</code>, <code>/doctors/{id}/availability</code></td><td><code>RG-06</code>, <code>clinic-hours.test.ts</code>, <code>clinic-hours-ui.test.tsx</code>, <code>schedule-manager.test.tsx</code></td></tr>
        <tr class="plain-row" data-module="M03"><td><strong>FR-06</strong></td><td><span class="badge bm3">M03</span></td><td>BR-02,05 · UC-06 · AC-06</td><td><code>/doctors/{id}/time-off</code>, <code>DELETE /time-off/{id}</code></td><td><code>RG-07</code>, <code>schedule-delete.test.ts</code> (4/4)</td></tr>
        <tr class="plain-row" data-module="M03"><td><strong>FR-07</strong></td><td><span class="badge bm3">M03</span></td><td>BR-01,02 · UC-07 · AC-07</td><td><code>GET /slots</code> (<code>V10</code>, <code>V11</code>)</td><td><code>RG-03</code>, <code>schedule-rules.test.ts</code>, k6 NFR-01 đạt <strong>p95 = 7,81 ms</strong></td></tr>
        <tr class="plain-row" data-module="M04"><td><strong>FR-08</strong></td><td><span class="badge bm4">M04</span></td><td>BR-03,04,11 · UC-08 · AC-08</td><td><code>POST /appointments</code> (Idempotency 24h)</td><td>k6 100 VU (1/99), NFR-01 <strong>p95 = 12,04 ms</strong>, <code>booking-offline.test.tsx</code> (<code>AGENT-TC-001</code>)</td></tr>
        <tr class="plain-row" data-module="M04"><td><strong>FR-09</strong></td><td><span class="badge bm4">M04</span></td><td>BR-03,04,08 · UC-09 · AC-09</td><td><code>POST /appointments/{id}/reschedule</code></td><td><code>SchedulingIntegrationTest</code> (cửa sổ 2h, version, deadlock lock ordering)</td></tr>
        <tr class="plain-row" data-module="M04"><td><strong>FR-10</strong></td><td><span class="badge bm4">M04</span></td><td>BR-08,11 · UC-10 · AC-10</td><td><code>POST /appointments/{id}/cancel</code></td><td><code>SchedulingIntegrationTest</code>, <code>scripts/smoke.py</code> (bỏ nhắc cũ)</td></tr>
        <tr class="plain-row" data-module="M04"><td><strong>FR-11</strong></td><td><span class="badge bm4">M04</span></td><td>BR-07,08,15 · UC-11 · AC-11</td><td><code>GET /appointments/{id}</code>, <code>POST .../progress</code></td><td><code>SchedulingIntegrationTest</code> (chuyển trạng thái &amp; đồng bộ Encounter)</td></tr>
        <tr class="plain-row" data-module="M05"><td><strong>FR-12</strong></td><td><span class="badge bm5">M05</span></td><td>BR-01,09,16 · UC-12 · AC-12</td><td><code>/encounters/{id}/record</code>, <code>/patients/{id}/records</code></td><td><code>SchedulingIntegrationTest</code> (audit READ fail-closed, chặn đọc chéo)</td></tr>
        <tr class="plain-row" data-module="M05"><td><strong>FR-13</strong></td><td><span class="badge bm5">M05</span></td><td>BR-09,10 · UC-13 · AC-13</td><td><code>PUT /encounters/{id}/record</code>, <code>/records/{id}/amendments</code></td><td><code>SchedulingIntegrationTest</code> (FINAL bất biến), <code>clinical-flow.test.tsx</code></td></tr>
        <tr class="plain-row" data-module="M05"><td><strong>FR-14</strong></td><td><span class="badge bm5">M05</span></td><td>BR-09,10 · UC-14 · AC-14</td><td><code>/encounters/{id}/prescriptions</code>, <code>/prescriptions/{id}/issue</code></td><td><code>SchedulingIntegrationTest</code> (422 khi thiếu trường), <code>clinical-flow.test.tsx</code></td></tr>
        <tr class="plain-row" data-module="M06"><td><strong>FR-15</strong></td><td><span class="badge bm6">M06</span></td><td>BR-11,12 · UC-15 · AC-15</td><td><code>/notification-jobs</code>, <code>NotificationWorker</code></td><td><code>SchedulingIntegrationTest</code> + Mailpit smoke (30p &amp; lọc version)</td></tr>
        <tr class="plain-row" data-module="M06"><td><strong>FR-16</strong></td><td><span class="badge bm6">M06</span></td><td>BR-11 · UC-16 · AC-16</td><td><code>NotificationStore</code> (backoff 1/5/15 phút)</td><td><code>SchedulingIntegrationTest</code> (thử lại 3 lần &amp; đánh FAILED không rollback lịch)</td></tr>
        <tr class="plain-row" data-module="M07"><td><strong>FR-17</strong></td><td><span class="badge bm7">M07</span></td><td>BR-12,13,16 · UC-17 · AC-17</td><td><code>Audit.java</code>, <code>RequestCorrelation.java</code></td><td><code>RG-01</code> (audit <code>DENIED</code>), tiêm lỗi DB audit rollback, <code>PatientAccountIntegrationTest</code></td></tr>
        <tr class="plain-row" data-module="M07"><td><strong>FR-18</strong></td><td><span class="badge bm7">M07</span></td><td>BR-01,12,13 · UC-18 · AC-18</td><td><code>GET /audit-events</code></td><td><code>SchedulingIntegrationTest</code> (phân trang, cấm UPDATE/DELETE CSDL), <code>RG-03</code></td></tr>
        <tr class="plain-row" data-module="M08"><td><strong>FR-19</strong></td><td><span class="badge bm8">M08</span></td><td>BR-06,07,08 · UC-19 · AC-19</td><td><code>POST /appointments/{id}/check-in</code></td><td><code>RG-10</code>, <code>RG-11</code>, <code>checkInHasExactTimeBoundariesAndRoleChecks</code></td></tr>
        <tr class="plain-row" data-module="M08"><td><strong>FR-20</strong></td><td><span class="badge bm8">M08</span></td><td>BR-06 · UC-20 · AC-20</td><td><code>GET /doctors/{id}/queue</code>, <code>POST .../queue/next</code></td><td><code>RG-04</code> (204 hàng rỗng), <code>RG-12</code> (khóa gọi đồng thời)</td></tr>
        <tr class="plain-row" data-module="M08"><td><strong>FR-21</strong></td><td><span class="badge bm8">M08</span></td><td>BR-06 · UC-21 · AC-21</td><td><code>POST /queue-tickets/{id}/skip</code></td><td><code>SchedulingIntegrationTest</code> (trả về <code>WAITING</code> ở <code>MAX+1</code> giữ ID)</td></tr>
        <tr class="plain-row" data-module="M09"><td><strong>FR-22</strong></td><td><span class="badge bm9">M09</span></td><td>BR-14 · UC-22 · AC-22</td><td><code>/appointments/{id}/telehealth-session</code>, <code>GET /webrtc/ice</code></td><td><code>SchedulingIntegrationTest</code>, <code>telehealth-lifecycle.test.tsx</code>, <code>verify-live-demo.py</code> (STUN 3478)</td></tr>
        <tr class="plain-row" data-module="M09"><td><strong>FR-23</strong></td><td><span class="badge bm9">M09</span></td><td>BR-14 · UC-23 · AC-23</td><td><code>/telehealth-sessions/{id}/join</code>, <code>/start</code>, <code>/signals</code></td><td><code>RG-01</code>, <code>npm run test:rtc</code> (2/2), <code>test_webrtc_turn_config.py</code>, <code>webrtc.test.ts</code> (14/14)</td></tr>
        <tr class="plain-row" data-module="M09"><td><strong>FR-24</strong></td><td><span class="badge bm9">M09</span></td><td>BR-14,15 · UC-24 · AC-24</td><td><code>/telehealth-sessions/{id}/connection</code>, <code>/end</code></td><td><code>npm run test:rtc</code> (ICE restart &amp; audio-only), <code>doctor-call-navigation.test.tsx</code>, thử điện thoại</td></tr>
        <tr class="plain-row" data-module="M06"><td><strong>FR-25</strong></td><td><span class="badge bm6">M06</span></td><td>BR-11,17 · UC-25 · AC-25</td><td><code>POST /appointments/{id}/delay-notice</code></td><td><code>SchedulingIntegrationTest</code>, <code>BusinessRulesUnitTest</code> (<code>AppointmentDelayPolicy</code>)</td></tr>
        <tr class="plain-row" data-module="M04 M06"><td><strong>FR-26</strong></td><td><span class="badge bm4">M04/M06</span></td><td>BR-08,12,18 · UC-26 · AC-26</td><td><code>POST /appointments/{id}/progress</code> (<code>NO_SHOW</code>)</td><td><code>SchedulingIntegrationTest</code> (mốc +15p, lý do, email mời tùy chọn)</td></tr>
        <tr class="plain-row" data-module="M01 M07"><td><strong>FR-27</strong></td><td><span class="badge bm1">M01/M07</span></td><td>BR-13,19 · UC-27 · AC-27</td><td><code>/patient-accounts/lookup</code>, <code>/{id}/access</code></td><td><code>PatientAccountIntegrationTest</code> (CI #43), <code>patient-accounts.test.tsx</code> (2/2)</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="section" id="scope-risks">
  <div class="sh"><span class="sh-ic">🛡️</span><div class="sh-txt"><h2>Ranh giới Thiết kế, Rủi ro Đã Chấp nhận &amp; Tính Minh bạch</h2><p>Ghi nhận trung thực phạm vi đồ án để sẵn sàng giải trình trước hội đồng</p></div></div>

  <div class="ov-grid">
    <div class="ov-card">
      <h4>1. Mật khẩu tài khoản mẫu Demo (Rủi ro đã chấp nhận)</h4>
      <p><code>scripts/prepare-internet.py</code> dùng fallback <code>DemoClinic</code> khi không truyền <code>DEMO_PASSWORD</code> để phục vụ demo nhanh với 100% dữ liệu giả (NFR-12). Đã khóa Keycloak Admin bằng mật khẩu ngẫu nhiên và bật brute-force 5 lần sai. Khi chạy thật bắt buộc đặt mật khẩu ngẫu nhiên hoặc tắt tài khoản mẫu.</p>
    </div>
    <div class="ov-card">
      <h4>2. Bằng chứng thử nghiệm thực địa (<code>NFR-08</code> &amp; <code>NFR-13</code>)</h4>
      <p>Nhóm đã kiểm tra đặt lịch và gọi video thực tế trên điện thoại qua bản demo HTTPS; tuy nhiên biên bản bấm giờ chi tiết cho <code>TC-N05</code> không lưu thành artifact nên sổ test ghi rõ <code>evidence_ref=NOT_RETAINED</code> để bảo đảm trung thực truy vết.</p>
    </div>
    <div class="ov-card">
      <h4>3. Giới hạn kiến trúc P2P WebRTC (<code>AC-24-E</code>)</h4>
      <p>Kiến trúc hiện tại dùng WebRTC P2P + signaling nội bộ + <code>coturn</code> STUN/TURN. Kết thúc phiên thu hồi room token và chặn kết nối signaling mới, không cưỡng chế cắt luồng socket media đã thiết lập (<code>AC-24-E</code> webhook/outbox của SFU ngoài phạm vi).</p>
    </div>
    <div class="ov-card">
      <h4>4. Hạng mục vận hành / CI định hướng phát triển</h4>
      <p>Trên Azure VM demo, Keycloak dùng <code>KC_DB: dev-file</code> để giữ dữ liệu demo; kịch bản E2E Playwright cho Google OAuth, quên mật khẩu SMTP và phát hành đơn thuốc xuyên UI tiếp tục hoàn thiện nếu mở rộng lên môi trường vận hành dài hạn.</p>
    </div>
  </div>
</section>
`;
