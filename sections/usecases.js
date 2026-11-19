/* sections/usecases.js — 24 UC expandable, tên & nội dung khớp use-case diagram */
/*
  Ánh xạ từ diagram (tiếng Anh) → tiếng Việt chuẩn:
  Danh tính & danh mục   : UC-01..06  (M01-M02-M03)
  Đặt lịch & hàng đợi   : UC-07..11, 19..21  (M03-M04-M08)
  Chăm sóc lâm sàng      : UC-12..14  (M05)
  Thông báo & kiểm toán  : UC-15..18  (M06-M07)
  Y tế từ xa             : UC-22..24  (M09)
  Ghi chú từ diagram:
    Audit là hành vi nội bộ, không phải hành động của Kiểm toán viên (trừ UC-18).
    UC-02 phân quyền tài nguyên là điều kiện tiên quyết trên mọi mục tiêu được bảo vệ.
    Xem đơn thuốc của bệnh nhân thuộc quyền truy cập lịch sử UC-12.
  Thay đổi so với phiên bản trước (đã đọc diagram):
    UC-02: "Phân quyền" → "Quản lý vai trò / Kiểm soát truy cập"
    UC-04: "Ngừng nhận lịch" → "Vô hiệu hóa bác sĩ"
    UC-05: "Lịch làm việc" → "Quản lý lịch làm việc"
    UC-06: "Lịch nghỉ" → "Quản lý lịch nghỉ"
    UC-07: "Tra cứu slot khả dụng" → "Tìm slot khả dụng"
    UC-11: "Xem lịch hẹn" → "Tiến trình lịch hẹn" + spec về state progression
    UC-12: "Lượt khám (Encounter)" → "Xem lịch sử được phép" + spec về reading history
    UC-13: "Hồ sơ khám" → "Ghi / Chốt / Bổ sung hồ sơ"
    UC-14: "Đơn thuốc" → "Kê đơn thuốc"
    UC-15: "Lịch sử hồ sơ" → "Nhận nhắc lịch hẹn" + spec về OutboxWorker reminder
    UC-16: "Thông báo" → "Giám sát lỗi gửi thông báo" + spec về monitoring failures
    UC-17: "Ghi audit" → "Ghi sự kiện kiểm toán"
    UC-18: "Tra cứu audit" → "Tra cứu lịch sử kiểm toán"
    UC-19: "Check-in" → "Check-in bệnh nhân"
    UC-20: "Gọi lượt" → "Gọi bệnh nhân tiếp theo"
    UC-21: "Bỏ lượt" → "Trả phiếu về cuối hàng đợi" (Return ticket to queue)
    UC-22: "Hoàn tất lượt" → "Chuẩn bị phiên khám từ xa" (Prepare remote session) + new spec
    UC-23: "Tham gia phiên từ xa" → "Tham gia / Bắt đầu phiên từ xa"
    UC-24: "Kết thúc phiên từ xa" → "Nối lại / Kết thúc phiên từ xa" + reconnect flow added
  Actor name changes (English → Vietnamese):
    Administrator → Quản trị viên
    Patient → Bệnh nhân
    Doctor → Bác sĩ
    Receptionist → Lễ tân
    Auditor → Kiểm toán viên
    Identity provider / IdP → Nhà cung cấp danh tính
    Video provider → Nhà cung cấp video
*/

window.SECTION_USECASES = `
<section class="section" id="uc-list">
  <div class="sh"><span class="sh-ic">👥</span><div class="sh-txt">
    <h2>Danh sách 24 Use Case</h2>
    <p>Nhấn vào hàng để mở đặc tả chi tiết · Sơ đồ sequence xem tại trang <a href="requirements.html">Yêu cầu</a></p>
  </div></div>
  <div class="alert alert-info" style="margin-bottom:16px">
    <span>ℹ️</span>
    <div><strong>Ghi chú thiết kế:</strong> Audit là hành vi nội bộ — không phải hành động của Kiểm toán viên. UC-02 (phân quyền) là tiền điều kiện ngầm định cho mọi UC có dữ liệu được bảo vệ. Xem đơn thuốc thuộc phạm vi UC-12.</div>
  </div>
  <div class="tbl-wrap">
    <table>
      <thead><tr><th>UC</th><th>Tên ca sử dụng</th><th>Tác nhân chính</th><th>Mô-đun</th><th>Điểm chú ý khi bảo vệ</th></tr></thead>
      <tbody>

        <!-- M01 Danh tính -->
        <tr class="fr-row" onclick="toggleFR('UC-01')">
          <td><strong>UC-01</strong><span class="fr-arr" id="arr-UC-01">▸</span></td>
          <td>Đăng nhập</td>
          <td><span class="actor">Người dùng</span> · <span class="actor">Nhà cung cấp danh tính</span></td>
          <td><span class="badge bm1">M01</span></td>
          <td>IdP lỗi → không tạo phiên; tài khoản bị khóa → 403</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-01"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p>Người dùng (mọi vai trò) · Nhà cung cấp danh tính (Keycloak)</p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Có tài khoản Keycloak hợp lệ; IdP đang hoạt động</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Người dùng nhấn "Đăng nhập"</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>JWT access + refresh token hợp lệ; chuyển hướng về dashboard theo vai trò</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Frontend chuyển hướng đến Keycloak với PKCE</li>
            <li>2. Người dùng nhập thông tin xác thực</li>
            <li>3. Keycloak xác thực, trả authorization code</li>
            <li>4. Backend đổi code lấy JWT access + refresh token</li>
            <li>5. Lưu token; chuyển hướng về dashboard theo vai trò</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> IdP lỗi / không phản hồi → 503; không tạo phiên</li>
            <li><span class="exc">E2</span> Sai mật khẩu → 401 từ Keycloak</li>
            <li><span class="exc">E3</span> Tài khoản bị khóa → 403</li>
            <li><span class="exc">E4</span> JWT hết hạn → tự refresh; nếu refresh cũng hết → đăng nhập lại</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" onclick="toggleFR('UC-02')">
          <td><strong>UC-02</strong><span class="fr-arr" id="arr-UC-02">▸</span></td>
          <td>Quản lý vai trò / Kiểm soát truy cập</td>
          <td><span class="actor">Người dùng</span></td>
          <td><span class="badge bm1">M01</span></td>
          <td>Tiền điều kiện ngầm định cho mọi UC bảo vệ; IDOR → 403</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-02"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p>Người dùng đã đăng nhập (mọi vai trò)</p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>JWT hợp lệ còn thời hạn</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Truy cập endpoint yêu cầu kiểm tra quyền</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Cho phép tiếp tục hoặc 403; audit ghi DENIED nếu bị từ chối</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Giải mã và xác thực JWT (chữ ký + hạn sử dụng)</li>
            <li>2. Kiểm tra vai trò: PATIENT / DOCTOR / RECEPTIONIST / AUDITOR / ADMIN</li>
            <li>3. Kiểm tra quan hệ sở hữu tài nguyên (ownership)</li>
            <li>4. Cho phép hoặc từ chối; ghi nhật ký audit</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Vai trò không phù hợp → 403 FORBIDDEN; audit DENIED</li>
            <li><span class="exc">E2</span> IDOR — cố đọc tài nguyên của người khác → 403</li>
            <li><span class="exc">E3</span> JWT hết hạn → 401 UNAUTHORIZED</li>
            <li><span class="exc">E4 (BE-01)</span> Truy cập DENIED không sinh audit_event — <strong>lỗi chưa sửa</strong></li>
          </ul></div>
        </div></div></td></tr>

        <!-- M02 Danh mục -->
        <tr class="fr-row" onclick="toggleFR('UC-03')">
          <td><strong>UC-03</strong><span class="fr-arr" id="arr-UC-03">▸</span></td>
          <td>Quản lý bác sĩ và chuyên khoa</td>
          <td><span class="actor">Quản trị viên</span></td>
          <td><span class="badge bm2">M02</span></td>
          <td>Chuyên khoa không tồn tại → từ chối; không lưu tham chiếu sai</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-03"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Quản trị viên</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Quản trị viên đã đăng nhập; chuyên khoa đích tồn tại</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Quản trị viên thêm hoặc sửa bác sĩ / chuyên khoa</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Danh mục cập nhật trong DB; bác sĩ có thể nhận lịch hẹn</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. POST/PUT /doctors hoặc /specialties</li>
            <li>2. Kiểm tra FK chuyên khoa tồn tại</li>
            <li>3. INSERT hoặc UPDATE bản ghi</li>
            <li>4. Trả 201/200</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Chuyên khoa không tồn tại → 404</li>
            <li><span class="exc">E2</span> Trùng tên / mã → 409</li>
            <li><span class="exc">E3</span> Thiếu quyền ADMIN → 403</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" onclick="toggleFR('UC-04')">
          <td><strong>UC-04</strong><span class="fr-arr" id="arr-UC-04">▸</span></td>
          <td>Vô hiệu hóa bác sĩ</td>
          <td><span class="actor">Quản trị viên</span></td>
          <td><span class="badge bm2">M02</span></td>
          <td>Còn lịch tương lai → trả xung đột, giữ nguyên trạng thái, không tự hủy</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-04"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Quản trị viên</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Bác sĩ đang hoạt động (is_active = true)</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Quản trị viên vô hiệu hóa bác sĩ</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Bác sĩ không nhận lịch mới; lịch hẹn tương lai giữ nguyên</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. PUT /doctors/{id}/deactivate</li>
            <li>2. Kiểm tra lịch hẹn CONFIRMED/PENDING trong tương lai</li>
            <li>3. Nếu không có xung đột → UPDATE is_active = false</li>
            <li>4. Trả 200</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Còn lịch tương lai → 409 với danh sách; hệ thống không tự hủy lịch</li>
            <li><span class="exc">E2</span> Bác sĩ không tồn tại → 404</li>
            <li><span class="exc">E3</span> Thiếu quyền ADMIN → 403</li>
          </ul></div>
        </div></div></td></tr>

        <!-- M03 Lịch làm việc -->
        <tr class="fr-row" onclick="toggleFR('UC-05')">
          <td><strong>UC-05</strong><span class="fr-arr" id="arr-UC-05">▸</span></td>
          <td>Quản lý lịch làm việc</td>
          <td><span class="actor">Bác sĩ</span></td>
          <td><span class="badge bm3">M03</span></td>
          <td>end ≤ start hoặc slotDuration ≤ 0 → từ chối; trùng khung giờ → 409</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-05"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bác sĩ</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Bác sĩ đã đăng nhập; is_active = true</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Bác sĩ tạo hoặc sửa khung giờ làm việc</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>WorkingSlot trong DB; slot con AVAILABLE để bệnh nhân đặt lịch</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. POST /working-slots với start, end, slotDuration</li>
            <li>2. Kiểm tra: end &gt; start, slotDuration &gt; 0, không giao nhau</li>
            <li>3. INSERT working_slot + tự động tạo appointment_slot con</li>
            <li>4. Trả 201</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> end ≤ start → 422 INVALID_TIME_RANGE</li>
            <li><span class="exc">E2</span> slotDuration ≤ 0 → 422 INVALID_DURATION</li>
            <li><span class="exc">E3</span> Trùng khung giờ → 409 SLOT_CONFLICT</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" onclick="toggleFR('UC-06')">
          <td><strong>UC-06</strong><span class="fr-arr" id="arr-UC-06">▸</span></td>
          <td>Quản lý lịch nghỉ</td>
          <td><span class="actor">Bác sĩ</span></td>
          <td><span class="badge bm3">M03</span></td>
          <td>Có lịch CONFIRMED trong khoảng → 409; không tự hủy lịch bệnh nhân</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-06"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bác sĩ</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Bác sĩ đã đăng nhập</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Bác sĩ đánh dấu khoảng thời gian nghỉ</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Các slot trong khoảng UNAVAILABLE; bệnh nhân bị ảnh hưởng được thông báo</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. POST /leave-requests với from, to</li>
            <li>2. Kiểm tra lịch hẹn CONFIRMED trong khoảng ngày</li>
            <li>3. INSERT leave_request; đánh dấu UNAVAILABLE các slot liên quan</li>
            <li>4. Enqueue notification_job cho bệnh nhân bị ảnh hưởng</li>
            <li>5. Trả 201</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Có lịch CONFIRMED trong khoảng → 409 với danh sách; không tự hủy</li>
            <li><span class="exc">E2</span> from ≥ to → 422 INVALID_DATE_RANGE</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" onclick="toggleFR('UC-07')">
          <td><strong>UC-07</strong><span class="fr-arr" id="arr-UC-07">▸</span></td>
          <td>Tìm slot khả dụng</td>
          <td><span class="actor">Bệnh nhân · Lễ tân</span></td>
          <td><span class="badge bm3">M03</span></td>
          <td>BE-02: Lễ tân nhận 403 — lỗi chưa sửa</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-07"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bệnh nhân</span>, <span class="actor">Lễ tân</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Đã đăng nhập</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Người dùng tra cứu slot trống của bác sĩ theo ngày / chuyên khoa</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Danh sách slot AVAILABLE trong tương lai</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. GET /slots?doctorId=&amp;date=</li>
            <li>2. Kiểm tra vai trò</li>
            <li>3. JOIN working_slot với appointment để loại slot đã được đặt</li>
            <li>4. Trả danh sách AVAILABLE</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1 (BE-02)</span> Lễ tân nhận 403 — <strong>lỗi chưa sửa</strong></li>
            <li><span class="exc">E2</span> Không có slot → [] với 200</li>
          </ul></div>
        </div></div></td></tr>

        <!-- M04 Đặt lịch hẹn -->
        <tr class="fr-row" onclick="toggleFR('UC-08')">
          <td><strong>UC-08</strong><span class="fr-arr" id="arr-UC-08">▸</span></td>
          <td>Đặt lịch hẹn ⭐</td>
          <td><span class="actor">Bệnh nhân</span></td>
          <td><span class="badge bm4">M04</span></td>
          <td>SELECT FOR UPDATE chống tranh chấp slot; idempotency; audit + thông báo sau commit</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-08"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bệnh nhân</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Bệnh nhân đã đăng nhập; slot còn trống và trong tương lai</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Bệnh nhân chọn slot và xác nhận đặt lịch</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Lịch hẹn CONFIRMED; audit CREATED; notification_job enqueued</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Bệnh nhân chọn chuyên khoa → bác sĩ → slot</li>
            <li>2. Xác thực JWT; kiểm tra Idempotency-Key</li>
            <li>3. BEGIN TRANSACTION · SELECT slot FOR UPDATE</li>
            <li>4. Kiểm tra xung đột và tính khả dụng của slot</li>
            <li>5. INSERT appointment (CONFIRMED) + audit + notification_job</li>
            <li>6. COMMIT · cache idempotency 24h</li>
            <li>7. OutboxWorker gửi email xác nhận sau commit</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Slot đã bị đặt → 409 SLOT_CONFLICT</li>
            <li><span class="exc">E2</span> Idempotency-Key đã dùng → 200 từ cache</li>
            <li><span class="exc">E3</span> JWT hết hạn → 401</li>
            <li><span class="exc">E4</span> Lỗi ghi audit → ROLLBACK (fail-closed)</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" onclick="toggleFR('UC-09')">
          <td><strong>UC-09</strong><span class="fr-arr" id="arr-UC-09">▸</span></td>
          <td>Đổi lịch hẹn ⭐</td>
          <td><span class="actor">Bệnh nhân</span></td>
          <td><span class="badge bm4">M04</span></td>
          <td>Cửa sổ 2h; version check; lock ordering tránh deadlock; rollback giữ lịch cũ</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-09"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bệnh nhân</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Lịch CONFIRMED; chủ sở hữu; còn ≥2h trước giờ hẹn</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Bệnh nhân chọn lịch cũ + slot mới và xác nhận đổi</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Slot cập nhật; version+1; audit RESCHEDULE; email xác nhận</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. PATCH /appointments/{id} với Idempotency-Key và version</li>
            <li>2. BEGIN TRANSACTION · SELECT FOR UPDATE · kiểm tra ownership</li>
            <li>3. Kiểm tra CONFIRMED và cửa sổ 2h</li>
            <li>4. Lock ordering: Doctor-ID → Patient-ID (tránh deadlock)</li>
            <li>5. SELECT slot mới FOR UPDATE; kiểm tra xung đột</li>
            <li>6. UPDATE appointment + INSERT audit + notification_job</li>
            <li>7. COMMIT · cache idempotency</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Không phải chủ sở hữu → 403</li>
            <li><span class="exc">E2</span> Trạng thái ≠ CONFIRMED → 409 INVALID_STATE</li>
            <li><span class="exc">E3</span> Còn &lt;2h → 409 CHANGE_WINDOW_EXPIRED</li>
            <li><span class="exc">E4</span> Slot mới đã bị đặt → 409 SLOT_CONFLICT</li>
            <li><span class="exc">E5</span> Version không khớp → 409 VERSION_CONFLICT</li>
            <li><span class="exc">E6</span> Lỗi gửi email sau COMMIT → <strong>không rollback</strong> lịch</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" onclick="toggleFR('UC-10')">
          <td><strong>UC-10</strong><span class="fr-arr" id="arr-UC-10">▸</span></td>
          <td>Hủy lịch hẹn</td>
          <td><span class="actor">Bệnh nhân</span></td>
          <td><span class="badge bm4">M04</span></td>
          <td>Chỉ CONFIRMED; job nhắc lịch cũ bị vô hiệu khi hủy</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-10"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bệnh nhân</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Lịch CONFIRMED; chủ sở hữu; còn ≥2h trước giờ hẹn</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Bệnh nhân nhấn "Hủy lịch"</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Lịch CANCELLED; slot giải phóng; audit CANCEL; job nhắc lịch vô hiệu</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. DELETE /appointments/{id}</li>
            <li>2. BEGIN TRANSACTION · SELECT FOR UPDATE · kiểm tra ownership</li>
            <li>3. Kiểm tra CONFIRMED và cửa sổ 2h</li>
            <li>4. UPDATE CANCELLED + INSERT audit(CANCEL) + notification_job(CANCELLED)</li>
            <li>5. COMMIT; slot trở về AVAILABLE</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Trạng thái ≠ CONFIRMED → 409 INVALID_STATE</li>
            <li><span class="exc">E2</span> &lt;2h → 409 CHANGE_WINDOW_EXPIRED</li>
            <li><span class="exc">E3</span> Không phải chủ sở hữu → 403</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" onclick="toggleFR('UC-11')">
          <td><strong>UC-11</strong><span class="fr-arr" id="arr-UC-11">▸</span></td>
          <td>Tiến trình lịch hẹn</td>
          <td><span class="actor">Bác sĩ · Bệnh nhân</span></td>
          <td><span class="badge bm4">M04</span></td>
          <td>Chỉ actor liên quan mới xem; trạng thái chuyển nguyên tử cùng Encounter</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-11"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bác sĩ</span>, <span class="actor">Bệnh nhân</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Lịch hẹn tồn tại; đã đăng nhập</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Xem trạng thái tiến trình, hoặc bác sĩ bắt đầu / kết thúc ca khám</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Trạng thái phản ánh đúng thực tế: CONFIRMED → CHECKED_IN → IN_PROGRESS → COMPLETED</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. GET /appointments/{id} → trả trạng thái hiện tại</li>
            <li>2. Bác sĩ bắt đầu khám → BEGIN TX · INSERT Encounter(ACTIVE) + UPDATE appointment(IN_PROGRESS) + UPDATE queue_ticket(IN_SERVICE) · COMMIT</li>
            <li>3. Bác sĩ kết thúc khám → BEGIN TX · UPDATE Encounter(COMPLETED) + appointment(COMPLETED) + queue_ticket(DONE) · COMMIT</li>
            <li>4. Enqueue notification_job sau mỗi chuyển trạng thái quan trọng</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Trạng thái không hợp lệ cho thao tác → 409 INVALID_STATE</li>
            <li><span class="exc">E2</span> Không có quyền xem (không phải actor liên quan) → 403</li>
            <li><span class="exc">E3</span> Lỗi ghi audit → ROLLBACK (fail-closed)</li>
          </ul></div>
        </div></div></td></tr>

        <!-- M05 Chăm sóc lâm sàng -->
        <tr class="fr-row" onclick="toggleFR('UC-12')">
          <td><strong>UC-12</strong><span class="fr-arr" id="arr-UC-12">▸</span></td>
          <td>Xem lịch sử được phép ⭐</td>
          <td><span class="actor">Bác sĩ · Bệnh nhân</span></td>
          <td><span class="badge bm5">M05</span></td>
          <td>RBAC + ownership; bệnh nhân chỉ thấy FINAL + ISSUED của chính mình; đơn thuốc thuộc UC-12</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-12"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bác sĩ</span>, <span class="actor">Bệnh nhân</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Đã đăng nhập; với bệnh nhân: phải là hồ sơ của chính mình</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Xem lịch sử hồ sơ khám, đơn thuốc, kết quả xét nghiệm</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Danh sách theo quyền: Bác sĩ xem FINAL + DRAFT của mình; Bệnh nhân chỉ xem FINAL + ISSUED</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. GET /medical-records?patientId= hoặc GET /prescriptions?patientId=</li>
            <li>2. Trích xuất patientId / doctorId từ JWT claim</li>
            <li>3. Bác sĩ: FINAL + DRAFT của mình; Bệnh nhân: chỉ FINAL + ISSUED</li>
            <li>4. Trả danh sách có phân trang · ghi audit READ</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Bệnh nhân cố xem DRAFT → 403 FORBIDDEN</li>
            <li><span class="exc">E2</span> Truy cập hồ sơ của người khác → 403 (IDOR)</li>
            <li><span class="exc">E3</span> Không có hồ sơ → [] với 200</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" onclick="toggleFR('UC-13')">
          <td><strong>UC-13</strong><span class="fr-arr" id="arr-UC-13">▸</span></td>
          <td>Ghi / Chốt / Bổ sung hồ sơ ⭐</td>
          <td><span class="actor">Bác sĩ</span></td>
          <td><span class="badge bm5">M05</span></td>
          <td>DRAFT → FINAL bất biến; amendment tạo version mới; audit fail-closed</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-13"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bác sĩ</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Bác sĩ có Encounter đang ACTIVE với bệnh nhân được phân công</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Bác sĩ lưu hoặc hoàn tất hồ sơ khám</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>DRAFT lưu với version; hoặc FINAL bất biến; amendment tạo DRAFT v=N+1</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. Bác sĩ nhập thông tin vào DRAFT (có thể sửa nhiều lần)</li>
            <li>2. Mỗi lần lưu: kiểm tra version + quyền + ghi audit</li>
            <li>3. Bác sĩ chốt → PUT finalize → FINAL (bất biến)</li>
            <li>4. Bổ sung: POST /amendments → DRAFT mới v=N+1, refId → FINAL gốc</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Ghi đè trực tiếp FINAL → 409 RECORD_IMMUTABLE</li>
            <li><span class="exc">E2</span> Bác sĩ không có quan hệ điều trị → 403</li>
            <li><span class="exc">E3</span> Version không khớp → 409 VERSION_CONFLICT</li>
            <li><span class="exc">E4</span> Lỗi audit → ROLLBACK (fail-closed)</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" onclick="toggleFR('UC-14')">
          <td><strong>UC-14</strong><span class="fr-arr" id="arr-UC-14">▸</span></td>
          <td>Kê đơn thuốc</td>
          <td><span class="actor">Bác sĩ</span></td>
          <td><span class="badge bm5">M05</span></td>
          <td>ISSUED bất biến; chỉ phát hành khi ≥1 dòng thuốc đầy đủ</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-14"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bác sĩ</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Encounter đang ACTIVE; bác sĩ là chủ Encounter</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Bác sĩ kê đơn thuốc cho bệnh nhân</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Prescription ISSUED (bất biến); audit PRESCRIPTION_ISSUED</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. POST /prescriptions với medications[]</li>
            <li>2. Kiểm tra Encounter ownership</li>
            <li>3. Kiểm tra ≥1 dòng thuốc đầy đủ (tên, liều, số ngày)</li>
            <li>4. INSERT prescription (ISSUED) + audit · COMMIT</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> 0 dòng thuốc → 422 EMPTY_PRESCRIPTION</li>
            <li><span class="exc">E2</span> Encounter không thuộc bác sĩ → 403</li>
            <li><span class="exc">E3</span> Muốn sửa ISSUED → phải tạo đơn thay thế mới</li>
          </ul></div>
        </div></div></td></tr>

        <!-- M06 Thông báo -->
        <tr class="fr-row" onclick="toggleFR('UC-15')">
          <td><strong>UC-15</strong><span class="fr-arr" id="arr-UC-15">▸</span></td>
          <td>Nhận nhắc lịch hẹn</td>
          <td><span class="actor">Bệnh nhân · Lễ tân</span></td>
          <td><span class="badge bm6">M06</span></td>
          <td>Gửi sau commit; job recheck trạng thái lịch trước khi gửi; lỗi gửi không rollback lịch</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-15"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bệnh nhân</span> (nhận), <span class="actor">Lễ tân</span> (nhận), Hệ thống OutboxWorker (gửi)</p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Lịch hẹn CONFIRMED; outbox_job PENDING trong DB</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Scheduler job kích hoạt OutboxWorker tại thời điểm định trước</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Email đã gửi; outbox_job SENT; lỗi gửi không ảnh hưởng lịch gốc</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. SELECT outbox_job WHERE type=REMINDER AND status=PENDING FOR UPDATE SKIP LOCKED</li>
            <li>2. Kiểm tra lịch hẹn còn CONFIRMED (chưa hủy)</li>
            <li>3. Gọi NotificationService gửi email</li>
            <li>4. UPDATE outbox_job = SENT</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Lịch đã CANCELLED → bỏ qua job (không gửi)</li>
            <li><span class="exc">E2</span> NotificationService timeout → retry với exponential backoff</li>
            <li><span class="exc">E3</span> Sau 3 lần thử → đánh FAILED; không rollback lịch hẹn</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" onclick="toggleFR('UC-16')">
          <td><strong>UC-16</strong><span class="fr-arr" id="arr-UC-16">▸</span></td>
          <td>Giám sát lỗi gửi thông báo</td>
          <td><span class="actor">Hệ thống · Quản trị viên</span></td>
          <td><span class="badge bm6">M06</span></td>
          <td>outbox_job FAILED sau max retry; cần cảnh báo / xử lý thủ công</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-16"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p>Hệ thống (Scheduler), <span class="actor">Quản trị viên</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Có outbox_job với status = FAILED trong DB</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>OutboxWorker đã retry hết số lần; hoặc Quản trị viên tra cứu job thất bại</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Danh sách lỗi hiển thị; job được đánh dấu để xử lý thủ công hoặc bỏ qua</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. GET /outbox-jobs?status=FAILED&amp;page=</li>
            <li>2. Kiểm tra vai trò ADMIN</li>
            <li>3. Hiển thị danh sách job thất bại với lý do lỗi và số lần retry</li>
            <li>4. Quản trị viên chọn retry thủ công hoặc đánh DISMISSED</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Không có job FAILED → [] với 200</li>
            <li><span class="exc">E2</span> Thiếu quyền ADMIN → 403</li>
          </ul></div>
        </div></div></td></tr>

        <!-- M07 Kiểm toán -->
        <tr class="fr-row" onclick="toggleFR('UC-17')">
          <td><strong>UC-17</strong><span class="fr-arr" id="arr-UC-17">▸</span></td>
          <td>Ghi sự kiện kiểm toán</td>
          <td><span class="actor">Hệ thống</span></td>
          <td><span class="badge bm7">M07</span></td>
          <td>Hành vi nội bộ — không phải hành động của Kiểm toán viên; lỗi audit → ROLLBACK</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-17"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p>Hệ thống — AuditAspect (Spring AOP); kích hoạt bởi mọi dịch vụ được bảo vệ</p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Đang trong giao dịch thao tác dữ liệu PHI</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Mọi thao tác đọc / ghi dữ liệu nhạy cảm được bảo vệ</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>audit_event ghi thành công cùng giao dịch chính; fail-closed nếu ghi lỗi</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. AuditAspect intercept trước / sau thao tác (annotation @Auditable)</li>
            <li>2. INSERT audit_event cùng giao dịch chính (cùng connection)</li>
            <li>3. Nếu INSERT lỗi → ROLLBACK toàn giao dịch (fail-closed)</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1 (BE-01)</span> Truy cập DENIED không sinh audit_event — <strong>lỗi chưa sửa</strong></li>
            <li><span class="exc">E2</span> INSERT audit thất bại → ROLLBACK fail-closed</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" onclick="toggleFR('UC-18')">
          <td><strong>UC-18</strong><span class="fr-arr" id="arr-UC-18">▸</span></td>
          <td>Tra cứu lịch sử kiểm toán</td>
          <td><span class="actor">Kiểm toán viên</span></td>
          <td><span class="badge bm7">M07</span></td>
          <td>BE-03: Kiểm toán viên đọc được catalog endpoint không được phép — lỗi chưa sửa</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-18"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Kiểm toán viên</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>JWT với vai trò AUDITOR; Kiểm toán viên tra cứu audit qua UC-18</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Kiểm toán viên tra cứu nhật ký sự kiện hệ thống</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Danh sách audit_event đã lọc; PHI được ẩn trước khi trả</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. GET /audit-events?từ=&amp;đến=&amp;loại=</li>
            <li>2. Kiểm tra vai trò AUDITOR</li>
            <li>3. SELECT với bộ lọc</li>
            <li>4. Che PHI (ẩn tên, CCCD) trước khi trả kết quả</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1 (BE-03)</span> Kiểm toán viên đọc được catalog endpoint không được phép — <strong>lỗi chưa sửa</strong></li>
            <li><span class="exc">E2</span> Thiếu quyền AUDITOR → 403</li>
            <li><span class="exc">E3</span> Không có sự kiện phù hợp → [] với 200</li>
          </ul></div>
        </div></div></td></tr>

        <!-- M08 Hàng đợi -->
        <tr class="fr-row" onclick="toggleFR('UC-19')">
          <td><strong>UC-19</strong><span class="fr-arr" id="arr-UC-19">▸</span></td>
          <td>Check-in bệnh nhân</td>
          <td><span class="actor">Lễ tân</span></td>
          <td><span class="badge bm8">M08</span></td>
          <td>Cửa sổ [T−15, T+15) phút; chỉ 1 phiếu/lịch; ngoài cửa sổ → từ chối</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-19"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Lễ tân</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Lịch CONFIRMED; trong cửa sổ [T−15, T+15) phút quanh giờ hẹn</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Lễ tân thực hiện check-in cho bệnh nhân</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>1 phiếu chờ WAITING; lịch hẹn CHECKED_IN; audit CHECKIN</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. POST /appointments/{id}/check-in</li>
            <li>2. BEGIN TRANSACTION · SELECT FOR UPDATE</li>
            <li>3. Kiểm tra cửa sổ T±15 phút và trạng thái CONFIRMED</li>
            <li>4. UPDATE appointment → CHECKED_IN + INSERT queue_ticket (WAITING)</li>
            <li>5. COMMIT</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Ngoài cửa sổ check-in → 422 OUTSIDE_CHECKIN_WINDOW</li>
            <li><span class="exc">E2</span> Đã check-in rồi → 409 ALREADY_CHECKED_IN</li>
            <li><span class="exc">E3</span> Lịch không ở CONFIRMED → 409 INVALID_STATE</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" onclick="toggleFR('UC-20')">
          <td><strong>UC-20</strong><span class="fr-arr" id="arr-UC-20">▸</span></td>
          <td>Gọi bệnh nhân tiếp theo ⭐</td>
          <td><span class="actor">Bác sĩ</span></td>
          <td><span class="badge bm8">M08</span></td>
          <td>FIFO; khóa tuần tự hóa tránh race condition; BE-04: hàng rỗng trả 404 thay 204</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-20"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bác sĩ</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Có phiếu chờ WAITING trong hàng đợi của bác sĩ trong ngày</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Bác sĩ nhấn "Gọi bệnh nhân tiếp theo"</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Phiếu IN_SERVICE; lịch hẹn IN_PROGRESS; thông tin bệnh nhân được trả về</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. POST /queue/next</li>
            <li>2. BEGIN TRANSACTION · SELECT queue_ticket WAITING FIFO FOR UPDATE</li>
            <li>3. UPDATE queue_ticket → IN_SERVICE + UPDATE appointment → IN_PROGRESS</li>
            <li>4. COMMIT · trả thông tin bệnh nhân</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1 (BE-04)</span> Hàng đợi rỗng → hiện trả 404; nên trả <strong>204 No Content</strong></li>
            <li><span class="exc">E2</span> Race condition 2 bác sĩ → khóa tuần tự hóa; chỉ 1 thành công</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" onclick="toggleFR('UC-21')">
          <td><strong>UC-21</strong><span class="fr-arr" id="arr-UC-21">▸</span></td>
          <td>Trả phiếu về cuối hàng đợi</td>
          <td><span class="actor">Lễ tân · Bác sĩ</span></td>
          <td><span class="badge bm8">M08</span></td>
          <td>Phiếu xuống cuối; không tạo phiếu mới; chỉ WAITING mới được trả</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-21"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Lễ tân</span>, <span class="actor">Bác sĩ</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Có phiếu WAITING ở đầu hàng đợi</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Lễ tân hoặc bác sĩ nhấn "Bỏ qua / Trả lại hàng đợi"</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Phiếu SKIPPED; sort_order xuống cuối; bệnh nhân tiếp theo được gọi</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. POST /queue-tickets/skip</li>
            <li>2. BEGIN TRANSACTION · SELECT FOR UPDATE · kiểm tra WAITING</li>
            <li>3. UPDATE SKIPPED + sort_order = MAX+1</li>
            <li>4. COMMIT</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Phiếu không ở trạng thái WAITING → 409 INVALID_STATE</li>
            <li><span class="exc">E2</span> Không thuộc hàng đợi của bác sĩ → 403</li>
          </ul></div>
        </div></div></td></tr>

        <!-- M09 Y tế từ xa -->
        <tr class="fr-row" onclick="toggleFR('UC-22')">
          <td><strong>UC-22</strong><span class="fr-arr" id="arr-UC-22">▸</span></td>
          <td>Chuẩn bị phiên khám từ xa</td>
          <td><span class="actor">Bác sĩ · Nhà cung cấp video</span></td>
          <td><span class="badge bm9">M09</span></td>
          <td>Phòng được tạo trước giờ hẹn; token TTL ≤15 phút; nhà cung cấp video xác nhận sẵn sàng</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-22"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bác sĩ</span>, Nhà cung cấp video</p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Lịch hẹn loại TELEHEALTH, trạng thái CONFIRMED; còn trong cửa sổ chuẩn bị</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Hệ thống / bác sĩ khởi tạo phòng khám từ xa trước giờ hẹn</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>telehealth_session WAITING; room token cấp cho bác sĩ; nhà cung cấp video xác nhận phòng sẵn sàng</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. POST /telehealth/sessions với appointmentId</li>
            <li>2. Gọi Video Provider API tạo room</li>
            <li>3. INSERT telehealth_session (WAITING) + lưu roomId</li>
            <li>4. TokenService cấp room token TTL ≤15 phút cho bác sĩ</li>
            <li>5. Trả roomId + token để bác sĩ chờ bệnh nhân vào</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Nhà cung cấp video không phản hồi → 503; không tạo phiên</li>
            <li><span class="exc">E2</span> Lịch không phải TELEHEALTH → 422</li>
            <li><span class="exc">E3</span> Phiên đã được tạo → trả roomId hiện có (idempotent)</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" onclick="toggleFR('UC-23')">
          <td><strong>UC-23</strong><span class="fr-arr" id="arr-UC-23">▸</span></td>
          <td>Tham gia / Bắt đầu phiên từ xa ⭐</td>
          <td><span class="actor">Bệnh nhân · Bác sĩ</span></td>
          <td><span class="badge bm9">M09</span></td>
          <td>Consent; token TTL ≤15 phút gắn participantId + roomId; nối lại trong cửa sổ còn mở</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-23"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bệnh nhân</span>, <span class="actor">Bác sĩ</span></p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Phiên TELEHEALTH đã chuẩn bị (UC-22); consent đã xác nhận; trong cửa sổ hợp lệ</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Nhấn "Tham gia phòng khám"</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Hai phía kết nối WebRTC; phiên ACTIVE; có thể nối lại khi phiên còn mở</p></div>
          <div class="uc-field full"><label>Luồng chính</label><ul>
            <li>1. POST /telehealth/waiting-room với appointmentId</li>
            <li>2. Kiểm tra consent + phiên hợp lệ</li>
            <li>3. TokenService cấp room token TTL ≤15 phút, gắn participantId + roomId</li>
            <li>4. UPDATE telehealth_session → ACTIVE · trả room token</li>
            <li>5. Signaling Server trao đổi ICE / SDP → kết nối P2P WebRTC</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Chưa consent → 403 CONSENT_REQUIRED</li>
            <li><span class="exc">E2</span> Token hết hạn → 401; yêu cầu token mới</li>
            <li><span class="exc">E3</span> Phiên đã kết thúc → 409; không cấp token mới</li>
            <li><span class="exc">E4</span> Mất kết nối → nối lại trong cửa sổ phiên còn mở</li>
            <li><span class="exc">Giới hạn</span> Signaling nội bộ trên localhost; chưa xác nhận media xuyên NAT / TURN thật</li>
          </ul></div>
        </div></div></td></tr>

        <tr class="fr-row" onclick="toggleFR('UC-24')">
          <td><strong>UC-24</strong><span class="fr-arr" id="arr-UC-24">▸</span></td>
          <td>Nối lại / Kết thúc phiên từ xa</td>
          <td><span class="actor">Bác sĩ · Bệnh nhân</span></td>
          <td><span class="badge bm9">M09</span></td>
          <td>Chặn cấp token mới sau ENDED; signaling không cưỡng chế ngắt P2P đã thiết lập</td>
        </tr>
        <tr class="fr-detail" id="detail-UC-24"><td colspan="5"><div class="fr-dcard"><div class="uc-body">
          <div class="uc-field"><label>Tác nhân</label><p><span class="actor">Bác sĩ</span> (kết thúc), <span class="actor">Bệnh nhân</span> (nối lại)</p></div>
          <div class="uc-field"><label>Tiền điều kiện</label><p>Phiên telehealth ACTIVE</p></div>
          <div class="uc-field"><label>Kích hoạt</label><p>Bác sĩ nhấn "Kết thúc phiên" hoặc bệnh nhân / bác sĩ nối lại sau mất kết nối</p></div>
          <div class="uc-field"><label>Hậu điều kiện</label><p>Nối lại: phiên tiếp tục; Kết thúc: phiên ENDED + appointment COMPLETED</p></div>
          <div class="uc-field full"><label>Luồng chính — Nối lại</label><ul>
            <li>1. POST /telehealth/waiting-room (tái dùng UC-23) trong khi phiên còn ACTIVE</li>
            <li>2. TokenService cấp token mới TTL ≤15 phút</li>
            <li>3. Signaling Server thiết lập lại ICE / SDP</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng chính — Kết thúc</label><ul>
            <li>1. POST /telehealth/sessions/{id}/end</li>
            <li>2. UPDATE telehealth_session → ENDED + INSERT block_token</li>
            <li>3. UPDATE appointment → COMPLETED</li>
            <li>4. Trả 200</li>
          </ul></div>
          <div class="uc-field full"><label>Luồng ngoại lệ</label><ul>
            <li><span class="exc">E1</span> Phiên không ở ACTIVE → 409 INVALID_STATE</li>
            <li><span class="exc">E2</span> Không phải bác sĩ của phiên → 403</li>
            <li><span class="exc">E3</span> Phiên đã ENDED → token bị chặn; không nối lại được</li>
          </ul></div>
        </div></div></td></tr>

      </tbody>
    </table>
  </div>
</section>
`;
