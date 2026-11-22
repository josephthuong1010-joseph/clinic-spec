/* sections/usecases.js — 27 Use Case (chuẩn Alistair Cockburn + OMG UML 2.5 · đồng bộ main@327a553, 22/11/2026) */

window.SECTION_USECASES = `
<section class="section" id="uc-list">
  <div class="sh"><span class="sh-ic">👥</span><div class="sh-txt">
    <h2>Danh sách 27 Use Case</h2>
    <p>UC-01..UC-27 (<code>main@327a553</code>) · nhấn vào hàng để mở đặc tả đầy đủ · Sơ đồ UML tương ứng xem tại <a href="diagrams.html#uc-diag">Sơ đồ UML</a> &amp; <a href="requirements.html">Yêu cầu</a></p>
  </div></div>
  <div class="alert alert-info" style="margin-bottom:12px">
    <span>📏</span>
    <div><strong>Chuẩn đặc tả Use Case:</strong> Trình bày theo mẫu <strong>Fully Dressed Use Case của Alistair Cockburn</strong> (gồm các trường chuẩn: <em>Tác nhân, Tiền điều kiện, Kích hoạt, Hậu điều kiện, Luồng chính, Luồng thay thế, Luồng ngoại lệ</em>) kết hợp mô hình hóa <strong>OMG UML 2.5</strong>.</div>
  </div>
  <div class="alert alert-info" style="margin-bottom:14px">
    <span>ℹ️</span>
    <div><strong>Ghi chú thiết kế:</strong> Ghi nhận sự kiện kiểm toán (<code>UC-17</code>) là hành vi nội bộ nguyên tử trong giao dịch/fail-closed — khác với thao tác tra cứu nhật ký của Kiểm toán viên (<code>UC-18</code>). <code>UC-02</code> là tiền điều kiện bắt buộc cho mọi API được bảo vệ. Xem đơn thuốc thuộc phạm vi truy cập lịch sử <code>UC-12</code>.</div>
  </div>
  <div class="filter-bar">
    <input type="search" class="search-in" placeholder="Tìm theo mã UC, tên, tác nhân, endpoint API..." oninput="setSearchFilter('uc-list', this.value)">
    <div class="chip-group">
      <button type="button" class="chip active" onclick="setModuleFilter('uc-list','ALL',this)">Tất cả (27)</button>
      <button type="button" class="chip" onclick="setModuleFilter('uc-list','M01',this)">M01</button>
      <button type="button" class="chip" onclick="setModuleFilter('uc-list','M02',this)">M02</button>
      <button type="button" class="chip" onclick="setModuleFilter('uc-list','M03',this)">M03</button>
      <button type="button" class="chip" onclick="setModuleFilter('uc-list','M04',this)">M04</button>
      <button type="button" class="chip" onclick="setModuleFilter('uc-list','M05',this)">M05</button>
      <button type="button" class="chip" onclick="setModuleFilter('uc-list','M06',this)">M06</button>
      <button type="button" class="chip" onclick="setModuleFilter('uc-list','M07',this)">M07</button>
      <button type="button" class="chip" onclick="setModuleFilter('uc-list','M08',this)">M08</button>
      <button type="button" class="chip" onclick="setModuleFilter('uc-list','M09',this)">M09</button>
    </div>
    <button type="button" class="btn-mini" onclick="toggleAllDetails('uc-list', true)">Mở tất cả</button>
    <button type="button" class="btn-mini" onclick="toggleAllDetails('uc-list', false)">Thu gọn</button>
    <span class="filter-count" id="count-uc-list">Hiển thị 27 / 27 mục</span>
  </div>
  <div class="tbl-wrap">
    <table>
      <thead><tr><th>UC</th><th>Tên ca sử dụng</th><th>Tác nhân chính</th><th>Mô-đun</th><th>Điểm nhấn nghiệp vụ &amp; bảo mật</th></tr></thead>
      <tbody>

        <!-- M01 Danh tính & Tài khoản -->
        <tr class="fr-row" data-id="UC-01" data-module="M01" onclick="toggleFR('UC-01')">
          <td><strong>UC-01</strong><span class="fr-arr" id="arr-UC-01">▸</span></td>
          <td>Đăng nhập, Google OAuth2, Quên mật khẩu &amp; OTP liên hệ</td>
          <td><span class="actor">Người dùng</span> · <span class="actor">IdP</span></td>
          <td><span class="badge bm1">M01</span></td>
          <td>PKCE S256 · Google OAuth2 tự cấp <code>PATIENT</code> · khóa tạm 5 lần sai · đổi email xác thực OTP 6 số</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-01"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p>Người dùng (mọi vai trò) · Keycloak 26.4 / Google OAuth2</p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Tài khoản tồn tại và <code>active=true</code> (hoặc đăng nhập Google lần đầu hợp lệ)</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Nhấn Đăng nhập, Tiếp tục với Google, Quên mật khẩu hoặc Cập nhật liên hệ</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>JWT access token lưu trong bộ nhớ client; tự chuyển về trang chủ vai trò mới nếu URL trước đó trái quyền</p></div>
          <div class="uc-field full"><label>Luồng chính &amp; Thay thế</label><ul>
            <li>1. Frontend chuyển hướng Keycloak (Authorization Code + PKCE S256); người dùng đăng nhập mật khẩu (&ge;8 ký tự) hoặc chọn <strong>Tiếp tục với Google</strong>.</li>
            <li>2. Lần đầu đăng nhập: Backend tạo tài khoản <code>UUIDv3(issuer|subject)</code>, tự cấp vai trò <code>PATIENT</code>, mã hóa AES-256-GCM email/SĐT + băm chỉ mục mù HMAC-SHA256.</li>
            <li>3. <strong>Quên mật khẩu:</strong> hiển thị thông báo trung tính; gửi liên kết đặt lại qua SMTP nếu tồn tại và mở khóa tạm ngay khi hoàn tất.</li>
            <li>4. <strong>Cập nhật liên hệ (<code>PUT /api/me/contact</code>):</strong> đổi sang email mới bắt buộc xác thực OTP 6 chữ số (<code>POST /api/me/contact/otp</code>, TTL 300s, cooldown 30s, tối đa 5/giờ/email đích, tối đa 5 lần sai); sửa chỉ SĐT không cần OTP.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Sai mật khẩu 5 lần trong 15 phút → Keycloak tạm khóa 60–900 giây; mở khóa khẩn cấp qua Quên mật khẩu</li>
            <li><span class="exc">E2</span> Tài khoản bị quản trị khóa → Backend từ chối 403 ngay cả khi JWT còn hạn</li>
            <li><span class="exc">E3</span> Sai/hết hạn OTP hoặc vượt giới hạn gửi → 400 / 429 (kèm Nginx rate-limit <code>10r/m</code> theo IP)</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" data-id="UC-02" data-module="M01" onclick="toggleFR('UC-02')">
          <td><strong>UC-02</strong><span class="fr-arr" id="arr-UC-02">▸</span></td>
          <td>Quản lý vai trò / Kiểm soát truy cập</td>
          <td><span class="actor">Người dùng</span> · <span class="actor">Quản trị</span></td>
          <td><span class="badge bm1">M01</span></td>
          <td>Tiền điều kiện bắt buộc cho mọi UC bảo vệ; role + resource ownership; <code>Guard</code> điều hướng sau đăng nhập</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-02"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p>Người dùng đã xác thực · Quản trị viên (cấp/thu hồi vai trò nhân sự)</p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>JWT hợp lệ (chữ ký RSA, <code>aud=clinic-api</code>, chưa hết hạn)</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Gọi endpoint được bảo vệ hoặc <code>Guard.tsx</code> kiểm tra tuyến đường</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Cho phép thực thi hoặc trả 403 + audit <code>DENIED</code> không chứa PHI</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Giải mã JWT và tra quyền thực tế trong bảng <code>user_role</code> của CSDL (không tin JWT role claim).</li>
            <li>2. Kiểm tra vai trò và quan hệ sở hữu/điều trị với tài nguyên đích.</li>
            <li>3. Ở frontend, nếu vừa đổi tài khoản khi đăng nhập (<code>fromSignin=true</code>) mà tuyến cũ vượt quyền → tự chuyển về trang chủ vai trò mới.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Truy cập trái quyền trực tiếp / IDOR → 403 (hoặc 404 ẩn sự tồn tại), ghi audit <code>DENIED</code> nguyên tử</li>
            <li><span class="exc">E2</span> JWT hết hạn hoặc sai chữ ký → 401 UNAUTHORIZED</li>
          </ul></div>
        </div></div></td></tr>

        <!-- M02 Danh mục -->
        <tr class="fr-row" data-id="UC-03" data-module="M02" onclick="toggleFR('UC-03')">
          <td><strong>UC-03</strong><span class="fr-arr" id="arr-UC-03">▸</span></td>
          <td>Quản lý bác sĩ và chuyên khoa</td>
          <td><span class="actor">Quản trị viên</span></td>
          <td><span class="badge bm2">M02</span></td>
          <td>Chuyên khoa không tồn tại/ngừng hoạt động → từ chối 404; không lưu tham chiếu sai</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-03"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Quản trị viên</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Quản trị đã đăng nhập; tài khoản nhân sự &amp; chuyên khoa đích đang hoạt động</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Quản trị thêm/cập nhật chuyên khoa, cấp nhân sự <code>POST /api/staff/provision</code> hoặc lưu hồ sơ bác sĩ</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Danh mục cập nhật trong DB kèm audit <code>SPECIALTY_*</code> / <code>DOCTOR_*</code></p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. <code>POST/PUT /api/specialties</code> hoặc <code>/api/doctors</code>.</li>
            <li>2. Kiểm tra chuyên khoa tồn tại (<code>active=TRUE</code>) và nhân sự hợp lệ.</li>
            <li>3. Lưu dữ liệu + liên kết <code>doctor_specialty</code> + ghi audit.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Chuyên khoa không tồn tại/ngừng hoạt động → 404</li>
            <li><span class="exc">E2</span> Kích hoạt bác sĩ khi user chưa có vai trò <code>DOCTOR</code> → 409 (<code>RG-09</code>)</li>
            <li><span class="exc">E3</span> Thiếu quyền <code>ADMINISTRATOR</code> → 403</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" data-id="UC-04" data-module="M02" onclick="toggleFR('UC-04')">
          <td><strong>UC-04</strong><span class="fr-arr" id="arr-UC-04">▸</span></td>
          <td>Ngừng nhận lịch / Vô hiệu hóa bác sĩ</td>
          <td><span class="actor">Quản trị viên</span></td>
          <td><span class="badge bm2">M02</span></td>
          <td>Còn lịch tương lai (<code>CONFIRMED</code>/<code>CHECKED_IN</code>/<code>IN_PROGRESS</code>) → 409; giữ nguyên lịch sử</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-04"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Quản trị viên</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Bác sĩ đang <code>active=true</code> và không còn lịch tương lai hiệu lực</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>PUT /api/doctors/{id}</code> với <code>active=false</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Bác sĩ ẩn khỏi tìm kiếm slot mới; mọi hồ sơ khám cũ giữ nguyên</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Khóa bản ghi <code>user_account</code> và <code>doctor</code> (<code>FOR UPDATE</code>).</li>
            <li>2. Kiểm tra lịch hẹn tương lai còn hiệu lực (<code>FOR SHARE</code>).</li>
            <li>3. Nếu trống → cập nhật <code>doctor.active = FALSE</code> và ghi audit <code>DOCTOR_UPDATED</code>.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Còn lịch tương lai → 409 "Doctor has active appointments" (<code>RG-08</code>)</li>
            <li><span class="exc">E2</span> Không tồn tại → 404; thiếu quyền → 403</li>
          </ul></div>
        </div></div></td></tr>

        <!-- M03 Lịch làm việc -->
        <tr class="fr-row" data-id="UC-05" data-module="M03" onclick="toggleFR('UC-05')">
          <td><strong>UC-05</strong><span class="fr-arr" id="arr-UC-05">▸</span></td>
          <td>Quản lý giờ phòng khám, ngày lễ &amp; lịch làm việc</td>
          <td><span class="actor">Bác sĩ · Quản trị</span></td>
          <td><span class="badge bm3">M03</span></td>
          <td>Tuân thủ giờ hoạt động/ngày lễ <code>H_eff(D)</code>; sinh slot chia hết không chồng lấp (mặc định 20 phút)</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-05"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bác sĩ</span> (ca làm việc), <span class="actor">Quản trị viên</span> (giờ tuần &amp; ngày lễ)</p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Bác sĩ đang <code>active=true</code>; ca mới nằm trong tương lai và nằm gọn trong giờ mở cửa hiệu lực</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>POST /api/doctors/{id}/availability</code> hoặc cập nhật <code>/api/clinic/hours</code>, <code>/api/clinic/holidays</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Lưu ca làm việc và sinh <code>N = (end - start) / (60 * slotMinutes)</code> slot con không chồng lấp</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Kiểm tra <code>start &lt; end</code>, chính xác theo phút, <code>end-start</code> chia hết cho <code>slotMinutes</code>, nằm trong <code>H_eff(D)</code>.</li>
            <li>2. Khóa <code>Doctor</code>, kiểm tra không chồng lấp với ca làm việc hiện có (<code>FOR SHARE</code>).</li>
            <li>3. Chèn <code>availability</code> + vòng lặp chèn từng bản ghi <code>slot</code> + audit.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Ngoài giờ hoạt động/ngày lễ hoặc sai thời lượng → 422</li>
            <li><span class="exc">E2</span> Trùng ca làm việc hiện có (hoặc lễ trùng/xung đột ca) → 409 (<code>RG-06</code>)</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" data-id="UC-06" data-module="M03" onclick="toggleFR('UC-06')">
          <td><strong>UC-06</strong><span class="fr-arr" id="arr-UC-06">▸</span></td>
          <td>Quản lý lịch nghỉ, giờ phòng khám &amp; ngày nghỉ lễ</td>
          <td><span class="actor">Bác sĩ · Quản trị</span></td>
          <td><span class="badge bm3">M03</span></td>
          <td>Có lịch hẹn hiệu lực trong khoảng nghỉ → 409; ngày nghỉ lễ ưu tiên trên giờ hằng tuần; không tự hủy lịch</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-06"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bác sĩ</span> (lịch nghỉ cá nhân), <span class="actor">Quản trị viên</span> (giờ phòng khám &amp; ngày lễ)</p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Khoảng nghỉ trong tương lai, nằm trong giờ hoạt động hiệu lực và không trùng lịch hẹn</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>POST /api/doctors/{id}/time-off</code> hoặc <code>PUT /api/clinic/hours</code>, <code>POST /api/clinic/holidays</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Lưu <code>time_off</code>; các slot giao với khoảng nghỉ bị loại khỏi <code>GET /api/slots</code></p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Khóa <code>Doctor</code>; kiểm tra khoảng hợp lệ.</li>
            <li>2. Kiểm tra lịch hẹn hiệu lực giao với <code>[start, end)</code> (<code>FOR SHARE</code>).</li>
            <li>3. Chèn <code>time_off</code> + audit <code>TIME_OFF_CREATED</code>.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Có lịch hẹn trong khoảng → 409 (<code>RG-07</code>)</li>
            <li><span class="exc">E2</span> <code>start &ge; end</code> hoặc quá khứ → 422</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" data-id="UC-07" data-module="M03" onclick="toggleFR('UC-07')">
          <td><strong>UC-07</strong><span class="fr-arr" id="arr-UC-07">▸</span></td>
          <td>Tìm slot khả dụng</td>
          <td><span class="actor">Bệnh nhân · Bác sĩ · Lễ tân · Quản trị</span></td>
          <td><span class="badge bm3">M03</span></td>
          <td>Đã sửa BE-02/03: mọi vai trò vận hành đọc được (<code>AUDITOR</code> thuần bị chặn 403); tối ưu NFR-01 <code>p95 = 7,81 ms</code></td>
        </tr>
        <tr class="fr-detail" id="detail-UC-07"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p>Vai trò vận hành: <span class="actor">Bệnh nhân</span>, <span class="actor">Bác sĩ</span>, <span class="actor">Lễ tân</span>, <span class="actor">Quản trị viên</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Đã đăng nhập bằng vai trò vận hành (<code>requireSchedulingCatalogRead</code>)</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>GET /api/slots?date=YYYY-MM-DD&amp;doctorId=&amp;specialtyId=&amp;mode=</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Danh sách slot còn trống (tối đa 500 bản ghi) loại trừ <code>time_off</code> và lịch hẹn hiệu lực</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Kiểm tra vai trò vận hành; ngày quá khứ trả rỗng ngay không cần quét DB.</li>
            <li>2. Truy vấn ứng viên slot trong ngày theo chỉ mục <code>ix_slot_start_at</code>.</li>
            <li>3. Tải phẳng danh sách <code>time_off</code> và <code>appointment</code> hiệu lực qua chỉ mục phủ cửa sổ (<code>V11</code>) rồi lọc trùng <code>O(N)</code>.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> <code>AUDITOR</code> thuần gọi endpoint → 403 FORBIDDEN (<code>RG-03</code>)</li>
            <li><span class="exc">E2</span> Không có slot phù hợp → <code>[]</code> kèm 200 OK</li>
          </ul></div>
        </div></div></td></tr>

        <!-- M04 Đặt lịch hẹn -->
        <tr class="fr-row" data-id="UC-08" data-module="M04" onclick="toggleFR('UC-08')">
          <td><strong>UC-08</strong><span class="fr-arr" id="arr-UC-08">▸</span></td>
          <td>Đặt lịch hẹn ⭐</td>
          <td><span class="actor">Bệnh nhân</span></td>
          <td><span class="badge bm4">M04</span></td>
          <td>Khóa <code>Doctor &rarr; Patient</code> chống trùng; <code>Idempotency-Key</code> 24h; k6 100 req tranh chấp đúng 1/99</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-08"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bệnh nhân</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Đã đăng nhập <code>PATIENT</code>; slot thuộc tương lai và còn khả dụng</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>POST /api/appointments</code> với <code>{slotId}</code> và header <code>Idempotency-Key</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Tạo lịch <code>CONFIRMED</code>, ghi audit <code>APPOINTMENT_BOOKED</code> và xếp <code>notification_job</code> xác nhận (+ nhắc trước 30p nếu đủ hạn)</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Kiểm tra replay Idempotency (<code>actorId + BOOK + key</code>).</li>
            <li>2. Khóa <code>Doctor</code> trước rồi <code>Patient</code> (<code>FOR UPDATE</code>); kiểm tra bác sĩ &amp; bệnh nhân đều rảnh trên 2 truy vấn chỉ mục tách riêng (<code>V10</code>/<code>V11</code>).</li>
            <li>3. Chèn <code>appointment (CONFIRMED)</code> + <code>audit_event</code> + <code>notification_job</code> trong cùng giao dịch <code>READ COMMITTED</code>.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Slot trùng bác sĩ/bệnh nhân hoặc nằm trong lịch nghỉ → 409</li>
            <li><span class="exc">E2</span> Phát lại cùng <code>Idempotency-Key</code> + cùng payload → 200 trả kết quả cũ; khác payload → 409</li>
            <li><span class="exc">E3</span> Mất mạng UI → giữ lựa chọn và retry dùng cùng key (<code>booking-offline.test.tsx</code>)</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" data-id="UC-09" data-module="M04" onclick="toggleFR('UC-09')">
          <td><strong>UC-09</strong><span class="fr-arr" id="arr-UC-09">▸</span></td>
          <td>Đổi lịch hẹn ⭐</td>
          <td><span class="actor">Bệnh nhân</span></td>
          <td><span class="badge bm4">M04</span></td>
          <td>Cửa sổ &ge;2h; kiểm tra <code>version</code>; lock ordering tăng dần Doctor ID; thất bại giữ lịch cũ</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-09"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bệnh nhân</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Lịch <code>CONFIRMED</code> thuộc bệnh nhân và <code>now &le; start - 7200s</code></p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>POST /api/appointments/{id}/reschedule</code> kèm <code>{slotId, version}</code> và <code>Idempotency-Key</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Cập nhật slot mới, tăng <code>version+1</code>, audit <code>APPOINTMENT_RESCHEDULED</code>, xếp thông báo</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Kiểm tra Idempotency; lấy lịch &amp; slot mới.</li>
            <li>2. Khóa tập bác sĩ theo <code>TreeSet</code> tăng dần rồi khóa <code>Patient</code> (tránh deadlock).</li>
            <li>3. Kiểm tra <code>CONFIRMED</code>, <code>version</code>, hạn &ge;2h và tính khả dụng slot mới (bỏ qua chính lịch đang đổi).</li>
            <li>4. Cập nhật lịch, tăng <code>version</code>, ghi audit và outbox cùng giao dịch.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Sai <code>version</code>, quá mốc 2h, hoặc slot mới trùng → 409 và giữ nguyên lịch cũ</li>
            <li><span class="exc">E2</span> Lỗi gửi SMTP sau commit → không rollback lịch</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" data-id="UC-10" data-module="M04" onclick="toggleFR('UC-10')">
          <td><strong>UC-10</strong><span class="fr-arr" id="arr-UC-10">▸</span></td>
          <td>Hủy lịch hẹn</td>
          <td><span class="actor">Bệnh nhân</span></td>
          <td><span class="badge bm4">M04</span></td>
          <td>Chỉ <code>CONFIRMED</code> &amp; &ge;2h; lý do bắt buộc; job nhắc phiên bản cũ tự bỏ qua</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-10"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bệnh nhân</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Lịch <code>CONFIRMED</code> thuộc bệnh nhân và còn &ge;2h</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>POST /api/appointments/{id}/cancel</code> với <code>{reason, version}</code> + <code>Idempotency-Key</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Lịch <code>CANCELLED</code>, <code>version+1</code>, giải phóng slot và xếp thông báo hủy</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Kiểm tra lý do hợp lệ (1–1000 ký tự) và Idempotency.</li>
            <li>2. Khóa <code>Doctor</code> &rarr; <code>Patient</code>; kiểm tra trạng thái, <code>version</code>, hạn &ge;2h.</li>
            <li>3. Cập nhật <code>CANCELLED</code>, lưu lý do, tăng <code>version</code>, ghi audit và outbox.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Trạng thái &ne; <code>CONFIRMED</code> hoặc còn &lt;2h → 409</li>
            <li><span class="exc">E2</span> Thiếu lý do → 422</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" data-id="UC-11" data-module="M04" onclick="toggleFR('UC-11')">
          <td><strong>UC-11</strong><span class="fr-arr" id="arr-UC-11">▸</span></td>
          <td>Tiến trình lịch hẹn</td>
          <td><span class="actor">Bác sĩ · Lễ tân · Bệnh nhân</span></td>
          <td><span class="badge bm4">M04</span></td>
          <td>Đồng bộ nguyên tử Appointment + Encounter + QueueTicket / TelehealthSession</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-11"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bác sĩ</span>, <span class="actor">Lễ tân</span>, <span class="actor">Bệnh nhân</span> (xem)</p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Lịch hẹn tồn tại và người thao tác có quan hệ hợp lệ</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>GET /api/appointments/{id}</code> hoặc <code>POST /api/appointments/{id}/progress</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Chuyển trạng thái hợp lệ: <code>CHECKED_IN &rarr; IN_PROGRESS &rarr; COMPLETED</code> (hoặc <code>NO_SHOW</code> qua UC-26)</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Bắt đầu khám trực tiếp: yêu cầu lịch <code>CHECKED_IN</code> + phiếu <code>CALLED</code> → tạo <code>Encounter</code>, chuyển lịch <code>IN_PROGRESS</code> và phiếu <code>IN_SERVICE</code>.</li>
            <li>2. Kết thúc khám: yêu cầu hồ sơ đã <code>FINAL</code> (và phiên từ xa <code>ENDED</code> nếu là <code>REMOTE</code>) → chuyển Encounter, lịch <code>COMPLETED</code> và phiếu <code>DONE</code>.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Chưa chốt hồ sơ <code>FINAL</code> hoặc chưa <code>endSession</code> từ xa → 409</li>
            <li><span class="exc">E2</span> Cố chuyển ngược từ trạng thái kết thúc → 409</li>
          </ul></div>
        </div></div></td></tr>

        <!-- M05 Chăm sóc lâm sàng -->
        <tr class="fr-row" data-id="UC-12" data-module="M05" onclick="toggleFR('UC-12')">
          <td><strong>UC-12</strong><span class="fr-arr" id="arr-UC-12">▸</span></td>
          <td>Xem lịch sử được phép ⭐</td>
          <td><span class="actor">Bác sĩ · Bệnh nhân</span></td>
          <td><span class="badge bm5">M05</span></td>
          <td>Ghi audit <code>READ</code> fail-closed trước khi trả bệnh án/đơn thuốc; bệnh nhân chỉ thấy FINAL + ISSUED</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-12"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bác sĩ</span> (có quan hệ điều trị), <span class="actor">Bệnh nhân</span> (chủ sở hữu)</p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Đã xác thực; có quan hệ sở hữu hoặc lịch phân công hợp lệ</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>GET /api/patients/{id}/records</code>, <code>/patients/{id}/prescriptions</code>, <code>/encounters/{id}/record</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Trả dữ liệu được phép kèm nhật ký kiểm toán truy cập</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Kiểm tra vai trò &amp; quan hệ điều trị (<code>CONFIRMED</code>/<code>CHECKED_IN</code>/<code>IN_PROGRESS</code> hoặc khám <code>COMPLETED</code> của chính bác sĩ).</li>
            <li>2. Ghi <code>audit_event</code> trong cùng giao dịch trước khi trả dữ liệu (lỗi audit → hoàn tác).</li>
            <li>3. Bệnh nhân chỉ xem bản <code>FINAL</code> &amp; đơn <code>ISSUED</code> của mình; bác sĩ phụ trách đọc được cả <code>DRAFT</code> của lần khám.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Không có quan hệ điều trị hoặc đọc chéo hồ sơ người khác → 403 / 404</li>
            <li><span class="exc">E2</span> Lỗi ghi audit → 503 không trả bệnh án</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" data-id="UC-13" data-module="M05" onclick="toggleFR('UC-13')">
          <td><strong>UC-13</strong><span class="fr-arr" id="arr-UC-13">▸</span></td>
          <td>Ghi / Chốt / Bổ sung hồ sơ ⭐</td>
          <td><span class="actor">Bác sĩ</span></td>
          <td><span class="badge bm5">M05</span></td>
          <td><code>DRAFT &rarr; FINAL</code> bất biến; khóa lạc quan <code>version</code>; bổ sung tạo bản FINAL mới có lý do</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-13"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bác sĩ</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Bác sĩ phụ trách Encounter; nội dung &le; 100.000 ký tự</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>PUT /api/encounters/{id}/record</code> hoặc <code>POST /api/records/{id}/amendments</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Nội dung mã hóa AES-256-GCM được lưu kèm phiên bản, tác giả và audit</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Lưu nháp (<code>DRAFT</code>) hoặc chốt hoàn tất (<code>FINAL</code>) với kiểm tra khớp <code>version</code> &amp; khóa Encounter.</li>
            <li>2. Chốt <code>FINAL</code> khóa cứng bản ghi; sau đó muốn sửa phải gọi <code>amendments</code> với lý do hợp lệ để tạo bản <code>FINAL</code> mới trỏ tới bản gốc.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Sai <code>version</code> hoặc cố sửa trực tiếp bản <code>FINAL</code> → 409</li>
            <li><span class="exc">E2</span> Chưa phải bác sĩ phụ trách → 403</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" data-id="UC-14" data-module="M05" onclick="toggleFR('UC-14')">
          <td><strong>UC-14</strong><span class="fr-arr" id="arr-UC-14">▸</span></td>
          <td>Kê và phát hành đơn thuốc</td>
          <td><span class="actor">Bác sĩ</span></td>
          <td><span class="badge bm5">M05</span></td>
          <td><code>ISSUED</code> bất biến; phát hành yêu cầu &ge;1 dòng đủ 5 trường thuốc; sửa nháp bằng PUT</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-14"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bác sĩ</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Bác sĩ phụ trách Encounter đang mở</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>POST /api/encounters/{id}/prescriptions</code>, <code>PUT /api/prescriptions/{id}</code>, <code>POST /api/prescriptions/{id}/issue</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Đơn <code>ISSUED</code> kèm người lập, thời điểm và audit; bệnh nhân xem được qua lịch sử</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Tạo bản nháp hoặc cập nhật bản nháp hiện có bằng <code>PUT</code>.</li>
            <li>2. Phát hành kiểm tra &ge;1 dòng thuốc đủ <code>medicineName</code>, <code>doseText</code>, <code>route</code>, <code>frequency</code>, <code>durationText</code> (&le;1000 ký tự).</li>
            <li>3. Chuyển sang <code>ISSUED</code> bất biến + audit cùng giao dịch.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Phát hành đơn rỗng hoặc thiếu trường bắt buộc → 422; giữ nguyên <code>DRAFT</code></li>
            <li><span class="exc">E2</span> Sửa đơn đã <code>ISSUED</code> → 409; phải tạo đơn mới</li>
          </ul></div>
        </div></div></td></tr>

        <!-- M06 Thông báo -->
        <tr class="fr-row" data-id="UC-15" data-module="M06" onclick="toggleFR('UC-15')">
          <td><strong>UC-15</strong><span class="fr-arr" id="arr-UC-15">▸</span></td>
          <td>Nhận xác nhận &amp; nhắc lịch hẹn</td>
          <td><span class="actor">Bệnh nhân · Hệ thống · Email</span></td>
          <td><span class="badge bm6">M06</span></td>
          <td>Nhắc trước 30 phút (<code>1800 s</code>); kiểm tra lại <code>CONFIRMED</code> &amp; version trước gửi; nội dung tối thiểu</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-15"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bệnh nhân</span> (người nhận), Dịch vụ Email SMTP / Mailpit</p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p><code>notification_job</code> ở trạng thái <code>PENDING</code> và lịch còn <code>CONFIRMED</code> khớp <code>appointment_version</code></p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>NotificationWorker</code> quét các job đến hạn với cơ chế giữ lease <code>60 s</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Email đã gửi (<code>SENT</code>) không chứa chẩn đoán/đơn thuốc/token; job lỗi thời chuyển <code>SKIPPED</code></p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Khi đặt/đổi/hủy, xếp job xác nhận và job nhắc tại <code>start - 1800s</code> (nếu chưa qua mốc).</li>
            <li>2. Worker khóa hàng với lease 60s; đối chiếu lại trạng thái <code>CONFIRMED</code> và version.</li>
            <li>3. Giải mã email bệnh nhân, gửi qua SMTP (Brevo / Mailpit) và cập nhật <code>SENT</code>.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Lịch đã hủy hoặc đổi version → đánh dấu <code>SKIPPED</code>, không gửi nhầm</li>
            <li><span class="exc">E2</span> Chưa cấu hình email → bỏ qua an toàn theo NFR-12</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" data-id="UC-16" data-module="M06" onclick="toggleFR('UC-16')">
          <td><strong>UC-16</strong><span class="fr-arr" id="arr-UC-16">▸</span></td>
          <td>Thử lại &amp; Giám sát lỗi gửi thông báo</td>
          <td><span class="actor">Hệ thống · Lễ tân · Quản trị</span></td>
          <td><span class="badge bm6">M06</span></td>
          <td>Backoff <code>[60, 300, 900] s</code> tối đa 3 lần; lỗi SMTP không rollback lịch hẹn</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-16"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><code>NotificationWorker</code>, <span class="actor">Lễ tân</span>, <span class="actor">Quản trị viên</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Đã giao dịch lịch hẹn thành công; gửi SMTP tạm thời thất bại</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Lỗi/timeout SMTP hoặc nhân sự mở <code>GET /api/notification-jobs</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Thử lại theo lịch [1, 5, 15 phút]; vượt 3 lần chuyển <code>FAILED</code> hiển thị cho quản trị/lễ tân</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Ghi nhận lỗi gửi, tăng <code>attempts</code>, hẹn lại theo mảng trễ cố định <code>60s &rarr; 300s &rarr; 900s</code>.</li>
            <li>2. Nếu <code>attempts &gt; 3</code> → chuyển <code>FAILED</code>, ghi <code>last_error</code> ngắn gọn.</li>
            <li>3. <code>GET /api/notification-jobs</code> trả tối đa 100 job gần nhất để nhân sự theo dõi.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Tài khoản ngoài Lễ tân/Quản trị gọi <code>/notification-jobs</code> → 403</li>
          </ul></div>
        </div></div></td></tr>

        <!-- M07 Kiểm toán -->
        <tr class="fr-row" data-id="UC-17" data-module="M07" onclick="toggleFR('UC-17')">
          <td><strong>UC-17</strong><span class="fr-arr" id="arr-UC-17">▸</span></td>
          <td>Ghi sự kiện kiểm toán (Nội bộ fail-closed)</td>
          <td><span class="actor">Hệ thống</span></td>
          <td><span class="badge bm7">M07</span></td>
          <td>Đã sửa BE-01: audit <code>DENIED</code> mang <code>X-Request-Id</code> luôn được lưu nguyên tử; lỗi ghi → hoàn tác</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-17"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p>Thành phần <code>Audit</code> trong Backend (kích hoạt tự động bởi các Service)</p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Phát sinh truy cập nhạy cảm, thay đổi quyền, khóa/mở khóa hoặc từ chối truy cập</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Lời gọi <code>audit.record(...)</code> hoặc <code>audit.recordSystem(...)</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Lưu sự kiện (<code>actor_id</code>/<code>SYSTEM</code>, <code>action</code>, <code>resource</code>, <code>created_at</code>, <code>request_id</code>) không chứa PHI</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Thao tác ghi nghiệp vụ ghi audit cùng kết nối &amp; giao dịch CSDL.</li>
            <li>2. Thao tác đọc nhạy cảm ghi audit thành công trước khi trả dữ liệu.</li>
            <li>3. Từ chối truy cập phòng telehealth ghi <code>DENIED</code> qua giao dịch riêng bền vững kèm <code>X-Request-Id</code> (<code>RG-01</code>).</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Kho audit lỗi khi đọc/ghi dữ liệu nhạy cảm → rollback hoàn toàn và trả 503</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" data-id="UC-18" data-module="M07" onclick="toggleFR('UC-18')">
          <td><strong>UC-18</strong><span class="fr-arr" id="arr-UC-18">▸</span></td>
          <td>Tra cứu và bảo vệ nhật ký kiểm toán</td>
          <td><span class="actor">Kiểm toán viên</span></td>
          <td><span class="badge bm7">M07</span></td>
          <td>Chỉ <code>AUDITOR</code> đọc có lọc &amp; phân trang; append-only ở CSDL; đã sửa BE-03 cô lập phạm vi</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-18"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Kiểm toán viên</span> (<code>AUDITOR</code>)</p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Đã đăng nhập với vai trò <code>AUDITOR</code></p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>GET /api/audit-events?from=&amp;to=&amp;actorId=&amp;resourceId=&amp;limit=20&amp;offset=0</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Danh sách sự kiện phân trang (mảng trực tiếp, <code>limit &le; 100</code>) không chứa PHI/token</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Kiểm tra vai trò <code>AUDITOR</code>.</li>
            <li>2. Lọc <code>from</code> (inclusive), <code>to</code> (exclusive), tác nhân và mã tài nguyên.</li>
            <li>3. Trả kết quả có phân trang; tài khoản ứng dụng chỉ được <code>INSERT/SELECT</code> trên bảng <code>audit_event</code>.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Tài khoản ứng dụng yêu cầu UPDATE/DELETE bảng audit → CSDL từ chối</li>
            <li><span class="exc">E2</span> <code>AUDITOR</code> thuần đọc endpoint danh mục khám/bác sĩ → bị chặn 403 (<code>RG-03</code>)</li>
          </ul></div>
        </div></div></td></tr>

        <!-- M08 Hàng đợi -->
        <tr class="fr-row" data-id="UC-19" data-module="M08" onclick="toggleFR('UC-19')">
          <td><strong>UC-19</strong><span class="fr-arr" id="arr-UC-19">▸</span></td>
          <td>Check-in bệnh nhân</td>
          <td><span class="actor">Lễ tân</span></td>
          <td><span class="badge bm8">M08</span></td>
          <td>Cửa sổ <code>[T−15p, T+15p)</code>; chỉ lịch trực tiếp; tối đa 1 phiếu/lịch; vị trí <code>MAX+1</code> dưới khóa Doctor</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-19"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Lễ tân</span> (<code>RECEPTIONIST</code>)</p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Lịch <code>IN_PERSON</code> trạng thái <code>CONFIRMED</code> trong cửa sổ check-in</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>POST /api/appointments/{id}/check-in</code> + <code>Idempotency-Key</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>1 phiếu <code>WAITING</code> ở vị trí <code>MAX(position)+1</code>, lịch chuyển <code>CHECKED_IN</code></p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Kiểm tra Idempotency; khóa bản ghi <code>Doctor</code> (<code>FOR UPDATE</code>) để tuần tự hóa hàng đợi theo ngày VN.</li>
            <li>2. Nếu đã có ticket do request song song tạo trước → tái sử dụng chính ticket đó (<code>RG-10</code>).</li>
            <li>3. Ngược lại kiểm tra cửa sổ <code>[start-900s, start+900s)</code>, cấp <code>MAX(position)+1</code> và chuyển lịch <code>CHECKED_IN</code>.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Ngoài cửa sổ thời gian hoặc lịch <code>REMOTE</code>/<code>CANCELLED</code> → 409</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" data-id="UC-20" data-module="M08" onclick="toggleFR('UC-20')">
          <td><strong>UC-20</strong><span class="fr-arr" id="arr-UC-20">▸</span></td>
          <td>Gọi bệnh nhân tiếp theo ⭐</td>
          <td><span class="actor">Bác sĩ · Lễ tân</span></td>
          <td><span class="badge bm8">M08</span></td>
          <td>FIFO theo bác sĩ/ngày dưới khóa <code>Doctor</code>; đã sửa BE-04: hàng rỗng trả <strong>204 No Content</strong></td>
        </tr>
        <tr class="fr-detail" id="detail-UC-20"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bác sĩ</span> (của hàng đợi) hoặc <span class="actor">Lễ tân</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Không có phiếu đang ở trạng thái <code>CALLED</code> hoặc <code>IN_SERVICE</code> của bác sĩ trong ngày</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>POST /api/doctors/{id}/queue/next?date=YYYY-MM-DD</code> + <code>Idempotency-Key</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Phiếu đầu hàng chuyển <code>CALLED</code>; nếu rỗng trả <code>204 No Content</code> và ghi cache idempotency</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Kiểm tra Idempotency; khóa bản ghi <code>Doctor</code> (<code>FOR UPDATE</code>).</li>
            <li>2. Nếu hàng đã có phiếu đang <code>CALLED</code>/<code>IN_SERVICE</code> → 409.</li>
            <li>3. Lấy phiếu <code>WAITING</code> có <code>position</code> nhỏ nhất → chuyển <code>CALLED</code>; nếu không còn phiếu → hoàn tất Idempotency và trả 204 (<code>RG-04</code>).</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Hai request đồng thời → khóa <code>Doctor</code> chỉ cho 1 request nhận phiếu <code>CALLED</code>, request sau nhận 409 (<code>RG-12</code>)</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" data-id="UC-21" data-module="M08" onclick="toggleFR('UC-21')">
          <td><strong>UC-21</strong><span class="fr-arr" id="arr-UC-21">▸</span></td>
          <td>Bỏ lượt và đưa về cuối hàng đợi</td>
          <td><span class="actor">Lễ tân · Bác sĩ</span></td>
          <td><span class="badge bm8">M08</span></td>
          <td>Chỉ phiếu <code>CALLED</code>; giữ nguyên ticket ID; chuyển về <code>WAITING</code> ở vị trí <code>MAX+1</code></td>
        </tr>
        <tr class="fr-detail" id="detail-UC-21"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Lễ tân</span>, <span class="actor">Bác sĩ</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Phiếu đang ở trạng thái <code>CALLED</code>; có lý do và đúng <code>version</code></p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>POST /api/queue-tickets/{id}/skip</code> với <code>{reason, version}</code> + <code>Idempotency-Key</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Giữ nguyên <code>ticket.id</code>, đặt lại <code>status = WAITING</code> với <code>position = MAX(position) + 1</code> và ghi audit</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Khóa <code>Doctor</code>; kiểm tra phiếu đang <code>CALLED</code> và khớp <code>version</code>.</li>
            <li>2. Tính vị trí mới <code>MAX(position)+1</code> trong ngày/bác sĩ; cập nhật <code>status = WAITING</code>, tăng <code>version+1</code> và lưu lý do.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Phiếu đã vào khám (<code>IN_SERVICE</code>) hoặc sai version → 409</li>
          </ul></div>
        </div></div></td></tr>

        <!-- M09 Y tế từ xa -->
        <tr class="fr-row" data-id="UC-22" data-module="M09" onclick="toggleFR('UC-22')">
          <td><strong>UC-22</strong><span class="fr-arr" id="arr-UC-22">▸</span></td>
          <td>Chuẩn bị phiên khám từ xa</td>
          <td><span class="actor">Bệnh nhân · Bác sĩ</span></td>
          <td><span class="badge bm9">M09</span></td>
          <td>Cửa sổ phòng chờ <code>[-10p, +15p)</code>; tạo hoặc lấy phiên duy nhất; kiểm tra camera/mic</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-22"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bệnh nhân</span>, <span class="actor">Bác sĩ</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Lịch <code>REMOTE</code> trạng thái <code>CONFIRMED</code> hoặc đang diễn ra trong cửa sổ <code>[start-600s, start+900s)</code></p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>POST /api/appointments/{id}/telehealth-session</code> (+ <code>Idempotency-Key</code>)</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Tạo hoặc trả lại đúng 1 phiên <code>telehealth_session</code> gắn với lịch</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Kiểm tra quyền sở hữu/phân công, loại <code>REMOTE</code> và cửa sổ chuẩn bị.</li>
            <li>2. Nếu phiên chưa tồn tại → chèn <code>telehealth_session</code> trạng thái <code>CREATED</code>.</li>
            <li>3. Client kiểm tra thiết bị camera/micro cục bộ và lấy cấu hình STUN/TURN qua <code>GET /api/webrtc/ice</code>.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Lịch trực tiếp, đã hủy hoặc ngoài cửa sổ → 409 / 422</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" data-id="UC-23" data-module="M09" onclick="toggleFR('UC-23')">
          <td><strong>UC-23</strong><span class="fr-arr" id="arr-UC-23">▸</span></td>
          <td>Tham gia / Bắt đầu phiên từ xa ⭐</td>
          <td><span class="actor">Bệnh nhân · Bác sĩ</span></td>
          <td><span class="badge bm9">M09</span></td>
          <td>Xác nhận đồng ý; token phòng TTL <code>300 s</code>; signaling nội bộ + <code>coturn</code> STUN/TURN 3478</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-23"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bệnh nhân</span>, <span class="actor">Bác sĩ</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Phiên <code>CREATED/WAITING/ACTIVE/RECONNECTING</code>; bệnh nhân đã chọn <code>consent=true</code>; bác sĩ bắt đầu trong <code>[start, start+15p)</code></p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>POST /api/telehealth-sessions/{id}/join</code> &amp; <code>POST /api/telehealth-sessions/{id}/start</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Phiên <code>ACTIVE</code>, lịch <code>IN_PROGRESS</code>, Encounter tạo nguyên tử; hai bên kết nối P2P DTLS-SRTP</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Bệnh nhân gọi <code>join</code> (<code>{consent:true}</code>) → chuyển <code>WAITING</code> và nhận room token TTL <code>300 s</code>.</li>
            <li>2. Bác sĩ gọi <code>start</code> → chuyển <code>ACTIVE</code>, lịch <code>IN_PROGRESS</code> và tạo <code>Encounter</code> nguyên tử, rồi gọi <code>join</code> lấy token.</li>
            <li>3. Trao đổi OFFER/ANSWER/ICE qua <code>/api/telehealth-sessions/{id}/signals</code> (<code>X-Room-Token</code>, &le;300 msg/60s) và thiết lập media P2P qua STUN/TURN.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Người ngoài biết ID phiên → 404 + ghi audit <code>DENIED</code> mang <code>X-Request-Id</code> (<code>RG-01</code>)</li>
            <li><span class="exc">E2</span> Bệnh nhân chưa xác nhận đồng ý → 422/403</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" data-id="UC-24" data-module="M09" onclick="toggleFR('UC-24')">
          <td><strong>UC-24</strong><span class="fr-arr" id="arr-UC-24">▸</span></td>
          <td>Mất kết nối, Nối lại &amp; Kết thúc phiên từ xa</td>
          <td><span class="actor">Bác sĩ · Bệnh nhân</span></td>
          <td><span class="badge bm9">M09</span></td>
          <td>ICE restart + audio-only fallback; giữ nguyên bệnh án; bác sĩ chủ động kết thúc (<code>ENDED</code>) thu hồi token</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-24"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bác sĩ</span> (kết thúc / nối lại), <span class="actor">Bệnh nhân</span> (nối lại)</p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Phiên <code>ACTIVE</code> hoặc <code>RECONNECTING</code></p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>/connection</code> (<code>RECONNECTING/ACTIVE</code>), <code>join</code> cấp lại token, hoặc <code>/end</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Nối lại không phụ thuộc cửa sổ +15p ban đầu; <code>end</code> chuyển <code>ENDED</code> và xóa token/signal khỏi DB</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Khi mất mạng: gửi <code>connection</code> (<code>RECONNECTING</code>), bệnh án nháp giữ nguyên, gọi lại <code>join</code> để làm mới token 300s (tự động thu hồi token cũ) và thực hiện <code>ICE restart</code> hoặc chuyển chế độ chỉ âm thanh.</li>
            <li>2. Khi bác sĩ bấm Kết thúc: gọi <code>POST /end</code> → phiên <code>ENDED</code>, thu hồi toàn bộ token &amp; tín hiệu; sau đó bác sĩ hoàn tất Encounter riêng sau khi chốt <code>FINAL</code> (<code>BR-15</code>).</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Phiên đã <code>ENDED/CANCELLED</code> → từ chối cấp token và không cho phép mở lại bởi callback trễ</li>
            <li><span class="exc">E2</span> Kiến trúc P2P chỉ thu hồi quyền signaling/token mới, không cưỡng chế cắt socket media đã thiết lập (ngoài phạm vi <code>AC-24-E</code>)</li>
          </ul></div>
        </div></div></td></tr>

        <!-- Ca sử dụng mở rộng UC-25..UC-27 -->
        <tr class="fr-row" data-id="UC-25" data-module="M06" onclick="toggleFR('UC-25')">
          <td><strong>UC-25</strong><span class="fr-arr" id="arr-UC-25">▸</span></td>
          <td>Báo chậm giờ khám</td>
          <td><span class="actor">Lễ tân</span></td>
          <td><span class="badge bm6">M06</span></td>
          <td>Giữ nguyên giờ hẹn/trạng thái chính thức; tối đa 1 tác vụ email/version lịch; giờ dự kiến tùy chọn</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-25"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Lễ tân</span> (<code>RECEPTIONIST</code>)</p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Lịch trong ngày VN hiện tại: <code>CONFIRMED</code> trước <code>start+15p</code> hoặc <code>CHECKED_IN</code> trực tiếp</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>POST /api/appointments/{id}/delay-notice</code> kèm <code>{version, estimatedStartAt?}</code> + <code>Idempotency-Key</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Xếp tối đa 1 tác vụ <code>DELAY_NOTICE</code> cho phiên bản lịch đó; giữ nguyên giờ hẹn chính thức</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Kiểm tra quyền <code>RECEPTIONIST</code>, điều kiện <code>AppointmentDelayPolicy.canNotify</code> và khớp <code>version</code>.</li>
            <li>2. Nếu có <code>estimatedStartAt</code>: kiểm tra lớn hơn <code>max(start, now)</code> và trong cùng ngày VN.</li>
            <li>3. Lưu job <code>DELAY_NOTICE</code> và ghi audit trong cùng giao dịch.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Sai vai trò → 403; quá hạn hoặc đã có thông báo cho cùng version → 409; giờ dự kiến sai → 422</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" data-id="UC-26" data-module="M04 M06" onclick="toggleFR('UC-26')">
          <td><strong>UC-26</strong><span class="fr-arr" id="arr-UC-26">▸</span></td>
          <td>Ghi nhận vắng hẹn (<code>NO_SHOW</code>) &amp; lời mời đặt lại</td>
          <td><span class="actor">Lễ tân · Bác sĩ</span></td>
          <td><span class="badge bm4">M04</span> <span class="badge bm6">M06</span></td>
          <td>Từ mốc <code>start + 15 phút</code> trên lịch <code>CONFIRMED</code>; chặn nếu đã check-in; email mời tùy chọn</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-26"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Lễ tân</span> (lịch trực tiếp), <span class="actor">Bác sĩ</span> phụ trách (lịch từ xa)</p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Lịch <code>CONFIRMED</code> và <code>now &ge; start + 900s</code> (+15 phút)</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>POST /api/appointments/{id}/progress</code> với <code>targetStatus: "NO_SHOW"</code>, <code>noShowReason?</code>, <code>sendRebookingEmail?</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Lịch chuyển <code>NO_SHOW</code> (kết thúc); đóng phòng từ xa nếu có; xếp email mời đặt lại nếu được chọn; giữ nguyên quyền tài khoản bệnh nhân</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Kiểm tra vai trò theo hình thức khám, trạng thái <code>CONFIRMED</code> và mốc +15 phút.</li>
            <li>2. Cập nhật <code>NO_SHOW</code> + mã lý do (<code>PATIENT_ABSENT</code>, <code>COULD_NOT_CONTACT</code>, <code>TECHNICAL_ISSUE</code>, <code>OTHER</code>).</li>
            <li>3. Nếu là lịch từ xa có phiên <code>CREATED/WAITING</code> → chuyển <code>CANCELLED</code>; nếu bật <code>sendRebookingEmail</code> → xếp job email (không lộ lý do nội bộ).</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Trước mốc +15 phút hoặc bệnh nhân đã check-in → 409</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" data-id="UC-27" data-module="M01 M07" onclick="toggleFR('UC-27')">
          <td><strong>UC-27</strong><span class="fr-arr" id="arr-UC-27">▸</span></td>
          <td>Tra cứu &amp; Khóa/Mở khóa tài khoản bệnh nhân</td>
          <td><span class="actor">Quản trị viên</span></td>
          <td><span class="badge bm1">M01</span> <span class="badge bm7">M07</span></td>
          <td>Tra chính xác UUID/email/SĐT qua blind index HMAC (cấm tìm tên, 409 khi trùng SĐT); trả 3 trường tối thiểu</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-27"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Quản trị viên</span> (<code>ADMINISTRATOR</code>)</p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Tài khoản mục tiêu là bệnh nhân (<code>staff=false</code>); màn hình tra cứu mặc định trống</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p><code>GET /api/patient-accounts/lookup?q=...</code> hoặc <code>GET /patient-accounts/{id}</code> rồi <code>PUT /patient-accounts/{id}/access</code></p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Chỉ trả <code>{id, displayName, active}</code> + audit; khóa tài khoản chặn ngay cả token đang dùng còn hạn</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Quản trị nhập UUID, email hoặc SĐT (chuẩn hóa <code>+84</code>/<code>84</code> &rarr; <code>0</code>, 7–15 chữ số).</li>
            <li>2. Backend băm <code>Crypto.hash(norm(q))</code> tra chỉ mục mù HMAC-SHA256; trả 3 trường tối thiểu + ghi audit <code>PATIENT_ACCOUNT_LOOKUP</code>.</li>
            <li>3. Khóa/mở khóa gửi <code>{active, reason}</code> (<code>SECURITY_REVIEW</code>, <code>POLICY_REVIEW</code>, <code>PATIENT_REQUEST</code>), ghi audit và bảo toàn lịch sử khám.</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Nhập tên người hoặc chuỗi không đúng định dạng UUID/email/SĐT → 400</li>
            <li><span class="exc">E2</span> Tài khoản đích là nhân sự → 404; nhiều tài khoản gia đình dùng chung SĐT → 409 yêu cầu nhập UUID</li>
            <li><span class="exc">E3</span> Người không có quyền Quản trị → 403</li>
          </ul></div>
        </div></div></td></tr>

      </tbody>
    </table>
  </div>
</section>
`;
