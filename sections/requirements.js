/* sections/requirements.js — FR (24 · mở rộng + sơ đồ), NFR (12), Quy tắc nghiệp vụ (9) */

window.SECTION_REQUIREMENTS = `
<section class="section" id="fr">
  <div class="sh"><span class="sh-ic">✅</span><div class="sh-txt"><h2>Yêu cầu chức năng (FR)</h2><p>24 FR · viết theo cú pháp EARS · nhấn vào hàng để xem mô tả đầy đủ và sơ đồ liên quan</p></div></div>

  <div class="ears-box" style="margin-bottom:20px">
    <span class="kw">KHI</span> &lt;sự kiện kích hoạt&gt;, <span class="sys">hệ thống</span> <span class="act">PHẢI &lt;hành động/phản hồi có thể quan sát&gt;</span><br>
    <span class="kw">NẾU</span> &lt;điều kiện tiền đề&gt;, <span class="sys">hệ thống</span> <span class="act">PHẢI &lt;hành động&gt;</span><br>
    <span class="kw">TRONG KHI</span> &lt;trạng thái hệ thống&gt;, <span class="sys">hệ thống</span> <span class="act">PHẢI &lt;hành động liên tục&gt;</span>
  </div>

  <div class="tbl-wrap">
    <table>
      <thead><tr><th>Mã</th><th>Tên</th><th>Mô-đun</th><th>Mô tả EARS (rút gọn)</th><th>UC</th></tr></thead>
      <tbody>

        <!-- ══ M01 Xác thực & Phân quyền ══ -->
        <tr class="fr-row" onclick="toggleFR('FR-01')">
          <td><strong>FR-01</strong><span class="fr-arr" id="arr-FR-01">▸</span></td>
          <td>Xác thực OIDC</td>
          <td><span class="badge bm1">M01</span></td>
          <td>KHI yêu cầu đăng nhập, hệ thống PHẢI khởi tạo luồng OIDC với Keycloak</td>
          <td>UC-01</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-01">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">KHI</span> người dùng yêu cầu đăng nhập, hệ thống <span class="kw-shall">PHẢI</span> khởi tạo luồng OIDC Authorization Code Flow với Keycloak và chuyển hướng đến trang đăng nhập. Sau khi xác thực thành công, hệ thống <span class="kw-shall">PHẢI</span> phát hành JWT chứa thông tin vai trò và lưu trữ phiên.</p>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor U as Người dùng
  participant FE as Frontend
  participant KC as Keycloak
  participant API as Backend API

  U->>FE: Nhấn Đăng nhập
  FE->>KC: Chuyển hướng /authorize (PKCE + state)
  KC-->>U: Hiển thị trang đăng nhập
  U->>KC: Nhập tên đăng nhập + mật khẩu
  KC-->>FE: Authorization Code
  FE->>KC: POST /token (code + code_verifier)
  KC-->>FE: access_token và id_token (JWT)
  Note over FE: Lưu token vào bộ nhớ phiên
  FE->>API: Request + Authorization Bearer JWT
  API->>API: Xác thực chữ ký và claims JWT
  API-->>FE: 200 Dữ liệu được phép
              </div>
            </div>
            <div class="fr-links">
              <a href="usecases.html#uc-list">→ Danh sách UC</a>
              <a href="diagrams.html#uc-diag">→ Sơ đồ Use Case (nhóm M01)</a>
            </div>
          </div></td>
        </tr>

        <tr class="fr-row" onclick="toggleFR('FR-02')">
          <td><strong>FR-02</strong><span class="fr-arr" id="arr-FR-02">▸</span></td>
          <td>Phân quyền vai trò + tài nguyên</td>
          <td><span class="badge bm1">M01</span></td>
          <td>NẾU vai trò VÀ quan hệ tài nguyên hợp lệ, hệ thống PHẢI cho phép; NGƯỢC LẠI trả 403 và ghi audit DENIED</td>
          <td>UC-02</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-02">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">NẾU</span> người dùng có vai trò hợp lệ <strong>VÀ</strong> quan hệ tài nguyên được xác nhận (ví dụ: bác sĩ sở hữu lịch hẹn), hệ thống <span class="kw-shall">PHẢI</span> cho phép truy cập. <span class="kw-ears">NGƯỢC LẠI</span> hệ thống <span class="kw-shall">PHẢI</span> trả 403 FORBIDDEN và ghi sự kiện audit DENIED không chứa PHI (fail-closed).</p>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor U as Người dùng
  participant API as Backend API
  participant AZ as AuthorizationService
  participant DB as MySQL
  participant AUD as AuditService

  U->>API: Request tài nguyên + Bearer JWT
  API->>API: Giải mã JWT lấy role và userId
  API->>AZ: kiemTraQuyen(role, resourceId, userId)
  AZ->>DB: Kiểm tra quan hệ sở hữu tài nguyên

  alt Vai trò hợp lệ VÀ có quyền truy cập
    AZ-->>API: Cho phép truy cập
    API-->>U: 200 Dữ liệu
  else Không đủ quyền
    AZ->>AUD: Ghi audit DENIED (không có PHI)
    AZ-->>API: Từ chối
    API-->>U: 403 FORBIDDEN
  end
              </div>
            </div>
            <div class="fr-links">
              <a href="usecases.html#uc-list">→ Danh sách UC</a>
              <a href="diagrams.html#uc-diag">→ Sơ đồ Use Case (nhóm M01)</a>
              <a href="testing.html#pcl">→ Kết quả kiểm thử NFR-03</a>
            </div>
          </div></td>
        </tr>

        <!-- ══ M02 Bác sĩ ══ -->
        <tr class="fr-row" onclick="toggleFR('FR-03')">
          <td><strong>FR-03</strong><span class="fr-arr" id="arr-FR-03">▸</span></td>
          <td>Danh mục bác sĩ / chuyên khoa</td>
          <td><span class="badge bm2">M02</span></td>
          <td>KHI admin lưu hồ sơ bác sĩ, hệ thống PHẢI xác thực tham chiếu chuyên khoa</td>
          <td>UC-03</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-03">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">KHI</span> quản trị viên lưu hồ sơ bác sĩ mới hoặc cập nhật, hệ thống <span class="kw-shall">PHẢI</span> xác thực rằng chuyên khoa được tham chiếu tồn tại trong danh mục trước khi lưu. Hệ thống <span class="kw-shall">PHẢI</span> từ chối nếu chuyên khoa không tồn tại.</p>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor A as Quản trị viên
  participant API as DoctorController
  participant SVC as DoctorService
  participant DB as MySQL

  A->>API: POST /doctors (hồ sơ bác sĩ + specialtyId)
  API->>API: Xác thực JWT (role ADMIN)
  API->>SVC: luuHoSoBacSi(dto)
  SVC->>DB: SELECT specialty WHERE id = specialtyId

  alt Chuyên khoa không tồn tại
    DB-->>SVC: Không có kết quả
    SVC-->>API: Lỗi tham chiếu chuyên khoa
    API-->>A: 400 SPECIALTY_NOT_FOUND
  else Chuyên khoa hợp lệ
    SVC->>DB: INSERT INTO doctor (thông tin + specialty_id)
    DB-->>SVC: OK
    SVC-->>API: Hồ sơ đã lưu
    API-->>A: 201 Created
  end
              </div>
            </div>
            <div class="fr-links">
              <a href="diagrams.html#uc-diag">→ Sơ đồ Use Case (nhóm M01–M02)</a>
            </div>
          </div></td>
        </tr>

        <tr class="fr-row" onclick="toggleFR('FR-04')">
          <td><strong>FR-04</strong><span class="fr-arr" id="arr-FR-04">▸</span></td>
          <td>Ngừng nhận lịch</td>
          <td><span class="badge bm2">M02</span></td>
          <td>NẾU không còn lịch tương lai, hệ thống PHẢI vô hiệu hóa đặt lịch và ẩn bác sĩ</td>
          <td>UC-04</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-04">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">NẾU</span> bác sĩ không còn lịch hẹn CONFIRMED nào trong tương lai, hệ thống <span class="kw-shall">PHẢI</span> vô hiệu hóa tính năng đặt lịch cho bác sĩ đó và ẩn họ khỏi kết quả tìm kiếm khả năng khám.</p>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor A as Quản trị viên
  participant API as DoctorController
  participant SVC as DoctorService
  participant DB as MySQL

  A->>API: PUT /doctors/{id}/deactivate
  API->>API: Xác thực JWT (role ADMIN)
  API->>SVC: ngungNhanLich(doctorId)
  SVC->>DB: SELECT COUNT lịch CONFIRMED trong tương lai

  alt Còn lịch hẹn tương lai
    DB-->>SVC: count > 0
    SVC-->>API: 409 HAS_FUTURE_APPOINTMENTS
    API-->>A: Không thể ngừng — còn lịch chờ khám
  else Không còn lịch tương lai
    SVC->>DB: UPDATE doctor SET accepting_bookings = false
    SVC->>DB: Đánh dấu ẩn khỏi kết quả tìm kiếm
    DB-->>SVC: OK
    SVC-->>API: Đã vô hiệu hóa
    API-->>A: 200 OK
  end
              </div>
            </div>
            <div class="fr-links">
              <a href="diagrams.html#uc-diag">→ Sơ đồ Use Case</a>
            </div>
          </div></td>
        </tr>

        <!-- ══ M03 Lịch làm việc ══ -->
        <tr class="fr-row" onclick="toggleFR('FR-05')">
          <td><strong>FR-05</strong><span class="fr-arr" id="arr-FR-05">▸</span></td>
          <td>Lịch làm việc</td>
          <td><span class="badge bm3">M03</span></td>
          <td>KHI bác sĩ lưu lịch làm việc, hệ thống PHẢI tạo các slot không chồng lấp trong khung thời gian</td>
          <td>UC-05</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-05">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">KHI</span> bác sĩ lưu lịch làm việc (ngày và giờ), hệ thống <span class="kw-shall">PHẢI</span> tự động tạo các slot thời gian không chồng lấp theo khoảng thời gian khám được định nghĩa, trong khung thời gian của lịch làm việc.</p>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor D as Bác sĩ
  participant API as ScheduleController
  participant SVC as ScheduleService
  participant DB as MySQL

  D->>API: POST /schedules (ngày + giờ bắt đầu/kết thúc)
  API->>API: Xác thực JWT (role DOCTOR)
  API->>SVC: luuLichLamViec(doctorId, schedule)
  SVC->>DB: Kiểm tra chồng lấp với lịch làm việc hiện có

  alt Chồng lấp thời gian
    DB-->>SVC: Phát hiện xung đột
    SVC-->>API: 409 SCHEDULE_OVERLAP
    API-->>D: Lỗi trùng lịch làm việc
  else Hợp lệ
    SVC->>SVC: Tạo danh sách slot không chồng lấp theo khoảng thời gian khám
    SVC->>DB: INSERT work_schedule
    SVC->>DB: INSERT time_slots (N slot)
    DB-->>SVC: OK
    SVC-->>API: Lịch và N slots đã tạo
    API-->>D: 201 Created
  end
              </div>
            </div>
            <div class="fr-links">
              <a href="diagrams.html#uc-diag">→ Sơ đồ Use Case (nhóm M03–M04)</a>
            </div>
          </div></td>
        </tr>

        <tr class="fr-row" onclick="toggleFR('FR-06')">
          <td><strong>FR-06</strong><span class="fr-arr" id="arr-FR-06">▸</span></td>
          <td>Lịch nghỉ</td>
          <td><span class="badge bm3">M03</span></td>
          <td>KHI lịch nghỉ được lưu, hệ thống PHẢI khóa các slot bị ảnh hưởng và từ chối đặt lịch xung đột</td>
          <td>UC-06</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-06">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">KHI</span> lịch nghỉ của bác sĩ được lưu, hệ thống <span class="kw-shall">PHẢI</span> đánh dấu tất cả các slot trong thời gian nghỉ là không khả dụng và từ chối mọi yêu cầu đặt lịch mới xung đột với thời gian nghỉ đó.</p>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor D as Bác sĩ
  participant API as ScheduleController
  participant SVC as ScheduleService
  participant DB as MySQL

  D->>API: POST /time-offs (ngày bắt đầu và kết thúc)
  API->>API: Xác thực JWT (role DOCTOR)
  API->>SVC: luuLichNghi(doctorId, timeOff)
  SVC->>DB: SELECT slots bị ảnh hưởng trong khoảng thời gian

  alt Có slot đã có lịch hẹn CONFIRMED
    DB-->>SVC: Danh sách slot xung đột
    SVC-->>API: 409 SLOTS_HAVE_CONFIRMED_BOOKINGS
    API-->>D: Hủy lịch hiện có trước khi đăng ký nghỉ
  else Không có xung đột
    SVC->>DB: UPDATE time_slots SET status = BLOCKED
    SVC->>DB: INSERT time_off record
    DB-->>SVC: OK
    SVC-->>API: Lịch nghỉ đã lưu
    API-->>D: 201 Created (N slot bị khóa)
  end
              </div>
            </div>
            <div class="fr-links">
              <a href="diagrams.html#uc-diag">→ Sơ đồ Use Case (nhóm M03–M04)</a>
            </div>
          </div></td>
        </tr>

        <tr class="fr-row" onclick="toggleFR('FR-07')">
          <td><strong>FR-07</strong><span class="fr-arr" id="arr-FR-07">▸</span></td>
          <td>Tra cứu slot khả dụng</td>
          <td><span class="badge bm3">M03</span></td>
          <td>KHI tra cứu khả năng khám theo chuyên khoa/bác sĩ/ngày, hệ thống PHẢI trả slot trống theo thời gian thực</td>
          <td>UC-07</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-07">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">KHI</span> người dùng tra cứu khả năng khám theo bộ lọc (chuyên khoa và/hoặc bác sĩ, và/hoặc ngày), hệ thống <span class="kw-shall">PHẢI</span> trả về danh sách slot trống theo thời gian thực, không bao gồm slot đã bị khóa bởi lịch hẹn CONFIRMED hoặc lịch nghỉ.</p>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor U as Người dùng
  participant API as AvailabilityController
  participant SVC as AvailabilityService
  participant DB as MySQL

  U->>API: GET /availability?specialty=&doctor=&date=
  API->>API: Xác thực JWT và kiểm tra vai trò
  API->>SVC: traSlotKhaDung(filter)
  SVC->>DB: SELECT slots WHERE date = ? AND status = AVAILABLE
  SVC->>DB: Loại trừ slots CONFIRMED và BLOCKED
  DB-->>SVC: Danh sách slot trống
  SVC-->>API: Kết quả lọc theo thời gian thực
  API-->>U: 200 Danh sách slot khả dụng

  Note over API,DB: Lỗi BE-02 — Lễ tân gọi endpoint này bị 403 (phân quyền chưa đúng)
              </div>
            </div>
            <div class="fr-links">
              <a href="diagrams.html#uc-diag">→ Sơ đồ Use Case</a>
              <a href="testing.html#pcl">→ TC-B08 (lỗi BE-02)</a>
            </div>
          </div></td>
        </tr>

        <!-- ══ M04 Lịch hẹn ══ -->
        <tr class="fr-row" onclick="toggleFR('FR-08')">
          <td><strong>FR-08</strong><span class="fr-arr" id="arr-FR-08">▸</span></td>
          <td>Đặt lịch hẹn</td>
          <td><span class="badge bm4">M04</span></td>
          <td>KHI đặt với slot hợp lệ và idempotency key, hệ thống PHẢI khóa slot và xác nhận nguyên tử</td>
          <td>UC-08</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-08">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">KHI</span> bệnh nhân gửi yêu cầu đặt lịch với slot hợp lệ, thông tin hợp lệ và idempotency key lần đầu, hệ thống <span class="kw-shall">PHẢI</span> (1) kiểm tra slot còn trống trong giao dịch, (2) tạo lịch hẹn CONFIRMED, (3) ghi sự kiện audit CREATED và đưa thông báo xác nhận vào hàng đợi — tất cả trong một giao dịch nguyên tử. Yêu cầu phát lại với cùng key và payload <span class="kw-shall">PHẢI</span> trả về 200 từ cache.</p>
            <div class="fr-diag-row">
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/sequence-diagrams/book-appointment.png')">
                <img src="../../docs/design/sequence-diagrams/book-appointment.png" onerror="this.style.height='50px'">
                <span>Sequence: Đặt lịch hẹn</span>
              </div>
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/activity-diagrams/booking.png')">
                <img src="../../docs/design/activity-diagrams/booking.png" onerror="this.style.height='50px'">
                <span>Activity: Quy trình đặt lịch</span>
              </div>
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/state-diagrams/appointment.png')">
                <img src="../../docs/design/state-diagrams/appointment.png" onerror="this.style.height='50px'">
                <span>Trạng thái: Lịch hẹn</span>
              </div>
            </div>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor P as Bệnh nhân
  participant FE as Frontend
  participant API as AppointmentController
  participant SVC as AppointmentService
  participant DB as MySQL

  P->>FE: Chọn slot và xác nhận đặt lịch
  FE->>API: POST /appointments + Idempotency-Key K1
  API->>API: Xác thực JWT

  alt Đã xử lý cùng key và payload
    API-->>FE: 200 (trả từ cache)
  end

  API->>SVC: datLich(slotId, patientId)
  SVC->>DB: BEGIN TRANSACTION
  SVC->>DB: SELECT slot FOR UPDATE

  alt Slot đã bị đặt
    SVC->>DB: ROLLBACK
    SVC-->>FE: 409 SLOT_CONFLICT
  else Slot còn trống
    SVC->>DB: INSERT appointment (CONFIRMED)
    SVC->>DB: INSERT audit_event (CREATED)
    SVC->>DB: INSERT notification_job
    SVC->>DB: COMMIT
    API->>API: Cache idempotency (TTL 24h)
    API-->>FE: 201 Created
    FE-->>P: Đặt lịch thành công
  end
              </div>
            </div>
            <div class="fr-links">
              <a href="usecases.html#uc-detail">→ Đặc tả UC-08</a>
              <a href="diagrams.html#seq-diag">→ Sơ đồ Sequence</a>
              <a href="diagrams.html#act-diag">→ Sơ đồ Activity</a>
              <a href="diagrams.html#state-diag">→ Sơ đồ Trạng thái</a>
            </div>
          </div></td>
        </tr>

        <tr class="fr-row" onclick="toggleFR('FR-09')">
          <td><strong>FR-09</strong><span class="fr-arr" id="arr-FR-09">▸</span></td>
          <td>Đổi lịch hẹn</td>
          <td><span class="badge bm4">M04</span></td>
          <td>NẾU lịch CONFIRMED VÀ còn ≥2h, hệ thống PHẢI đổi lịch; rollback giữ nguyên lịch cũ</td>
          <td>UC-09</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-09">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">NẾU</span> lịch hẹn ở trạng thái CONFIRMED <strong>VÀ</strong> còn ít nhất 2 giờ trước giờ bắt đầu, hệ thống <span class="kw-shall">PHẢI</span> cho phép đổi sang slot mới: kiểm tra slot mới trong giao dịch, cập nhật version+1, ghi audit RESCHEDULE. <span class="kw-ears">NẾU</span> thất bại bất kỳ điều kiện nào, hệ thống <span class="kw-shall">PHẢI</span> rollback và giữ nguyên lịch cũ.</p>
            <div class="fr-diag-row">
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/state-diagrams/appointment.png')">
                <img src="../../docs/design/state-diagrams/appointment.png" onerror="this.style.height='50px'">
                <span>Trạng thái: Lịch hẹn</span>
              </div>
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/activity-diagrams/booking.png')">
                <img src="../../docs/design/activity-diagrams/booking.png" onerror="this.style.height='50px'">
                <span>Activity: Quy trình đặt lịch</span>
              </div>
            </div>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor P as Bệnh nhân
  participant FE as Frontend
  participant API as AppointmentController
  participant SVC as AppointmentService
  participant DB as MySQL

  P->>FE: Chọn lịch cũ và slot mới
  FE->>API: PATCH /appointments/{id} + Idempotency-Key
  API->>SVC: doiLich(id, newSlot, version, patientId)
  SVC->>DB: BEGIN TRANSACTION
  SVC->>DB: SELECT appointment FOR UPDATE

  alt Không phải chủ sở hữu
    SVC->>DB: ROLLBACK
    SVC-->>FE: 403 FORBIDDEN
  else Còn dưới 2 giờ trước giờ hẹn
    SVC->>DB: ROLLBACK
    SVC-->>FE: 409 CHANGE_WINDOW_EXPIRED
  else Slot mới đã có người đặt
    SVC->>DB: ROLLBACK
    SVC-->>FE: 409 SLOT_CONFLICT
  else Hợp lệ
    SVC->>DB: UPDATE appointment + version+1
    SVC->>DB: INSERT audit RESCHEDULE
    SVC->>DB: INSERT notification_job
    SVC->>DB: COMMIT
    API-->>FE: 200 Đổi lịch thành công
    FE-->>P: Xác nhận đổi lịch
  end
              </div>
            </div>
            <p class="fr-no-diag">Phiên bản đầy đủ (lock ordering, OutboxWorker) xem tại trang Sơ đồ UML → Sequence</p>
            <div class="fr-links">
              <a href="usecases.html#uc-detail">→ Đặc tả UC-09</a>
              <a href="diagrams.html#seq-diag">→ Mermaid UC-09 đầy đủ</a>
              <a href="diagrams.html#state-diag">→ Sơ đồ Trạng thái</a>
            </div>
          </div></td>
        </tr>

        <tr class="fr-row" onclick="toggleFR('FR-10')">
          <td><strong>FR-10</strong><span class="fr-arr" id="arr-FR-10">▸</span></td>
          <td>Hủy lịch hẹn</td>
          <td><span class="badge bm4">M04</span></td>
          <td>NẾU lịch CONFIRMED, hệ thống PHẢI hủy và xếp thông báo; job kiểm tra lại trước khi gửi</td>
          <td>UC-10</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-10">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">NẾU</span> lịch hẹn ở trạng thái CONFIRMED, hệ thống <span class="kw-shall">PHẢI</span> hủy lịch (chuyển sang CANCELLED) và đưa thông báo xác nhận hủy vào hàng đợi outbox trong cùng giao dịch. Job thông báo <span class="kw-shall">PHẢI</span> kiểm tra lại trạng thái và version trước khi gửi để loại bỏ job cũ.</p>
            <div class="fr-diag-row">
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/sequence-diagrams/cancel-appointment.png')">
                <img src="../../docs/design/sequence-diagrams/cancel-appointment.png" onerror="this.style.height='50px'">
                <span>Sequence: Hủy lịch hẹn</span>
              </div>
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/state-diagrams/appointment.png')">
                <img src="../../docs/design/state-diagrams/appointment.png" onerror="this.style.height='50px'">
                <span>Trạng thái: Lịch hẹn</span>
              </div>
            </div>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor P as Bệnh nhân
  participant FE as Frontend
  participant API as AppointmentController
  participant SVC as AppointmentService
  participant DB as MySQL
  participant OUT as OutboxWorker

  P->>FE: Nhấn Hủy lịch hẹn
  FE->>API: DELETE /appointments/{id}
  API->>SVC: huyLich(appointmentId, userId)
  SVC->>DB: BEGIN TRANSACTION
  SVC->>DB: SELECT appointment FOR UPDATE

  alt Không phải chủ sở hữu
    SVC->>DB: ROLLBACK
    SVC-->>FE: 403 FORBIDDEN
  else Trạng thái không phải CONFIRMED
    SVC->>DB: ROLLBACK
    SVC-->>FE: 409 INVALID_STATE
  else Hợp lệ
    SVC->>DB: UPDATE appointment SET status = CANCELLED
    SVC->>DB: INSERT audit_event (CANCELLED)
    SVC->>DB: INSERT notification_job (xác nhận hủy)
    SVC->>DB: COMMIT
    API-->>FE: 200 Hủy thành công
    FE-->>P: Lịch đã được hủy

    Note over OUT: Gửi email sau COMMIT, lỗi không rollback lịch
    OUT->>DB: Lấy notification_job PENDING
    OUT->>OUT: Kiểm tra lại version và trạng thái
    OUT->>OUT: Gửi email xác nhận hủy
  end
              </div>
            </div>
            <div class="fr-links">
              <a href="diagrams.html#seq-diag">→ Sơ đồ Sequence</a>
              <a href="diagrams.html#state-diag">→ Sơ đồ Trạng thái</a>
            </div>
          </div></td>
        </tr>

        <tr class="fr-row" onclick="toggleFR('FR-11')">
          <td><strong>FR-11</strong><span class="fr-arr" id="arr-FR-11">▸</span></td>
          <td>Xem lịch hẹn</td>
          <td><span class="badge bm4">M04</span></td>
          <td>KHI bệnh nhân hoặc bác sĩ truy vấn lịch hẹn, hệ thống PHẢI trả về chỉ bản ghi được phép</td>
          <td>UC-11</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-11">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">KHI</span> bệnh nhân hoặc bác sĩ truy vấn danh sách lịch hẹn, hệ thống <span class="kw-shall">PHẢI</span> trả về chỉ những bản ghi mà người dùng hiện tại được phép xem theo ma trận phân quyền (bệnh nhân chỉ thấy lịch của mình; bác sĩ thấy lịch bệnh nhân đang điều trị).</p>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor U as Người dùng
  participant API as AppointmentController
  participant SVC as AppointmentService
  participant DB as MySQL

  U->>API: GET /appointments (Bearer JWT)
  API->>API: Giải mã JWT lấy role và userId

  alt Vai trò PATIENT
    API->>SVC: layLich WHERE patient_id = userId
  else Vai trò DOCTOR
    API->>SVC: layLich WHERE doctor_id = userId AND date = ?
  else Vai trò RECEPTIONIST
    API->>SVC: layLich WHERE date = TODAY
  end

  SVC->>DB: SELECT appointments (theo điều kiện phân quyền)
  DB-->>SVC: Danh sách lịch hẹn được phép xem
  SVC->>SVC: Loại bỏ bản ghi vượt quyền
  SVC-->>API: Kết quả đã lọc
  API-->>U: 200 Danh sách lịch hẹn
              </div>
            </div>
            <div class="fr-links">
              <a href="diagrams.html#uc-diag">→ Sơ đồ Use Case (nhóm M03–M04)</a>
            </div>
          </div></td>
        </tr>

        <!-- ══ M05 Hồ sơ lâm sàng ══ -->
        <tr class="fr-row" onclick="toggleFR('FR-12')">
          <td><strong>FR-12</strong><span class="fr-arr" id="arr-FR-12">▸</span></td>
          <td>Lịch sử lâm sàng và kiểm toán truy cập</td>
          <td><span class="badge bm5">M05</span></td>
          <td>KHI bác sĩ có quan hệ điều trị truy cập lịch sử, hệ thống PHẢI trả bản được phép và ghi nhật ký kiểm toán trước phản hồi</td>
          <td>UC-12</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-12">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">KHI</span> bác sĩ có quan hệ điều trị hoặc bệnh nhân là chủ sở hữu hồ sơ truy cập lịch sử lâm sàng, hệ thống <span class="kw-shall">PHẢI</span> kiểm tra quyền theo vai trò và quan hệ tài nguyên, ghi nhật ký kiểm toán trong cùng giao dịch, rồi mới trả danh sách bản được phép xem (bác sĩ: FINAL + DRAFT của mình; bệnh nhân: chỉ FINAL + ISSUED). <span class="kw-ears">NẾU</span> ghi nhật ký kiểm toán thất bại, hệ thống <span class="kw-shall">PHẢI</span> rollback và không trả dữ liệu (fail-closed).</p>
            <div class="fr-diag-row">
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/sequence-diagrams/medical-record.png')">
                <img src="../../docs/design/sequence-diagrams/medical-record.png" onerror="this.style.height='50px'">
                <span>Sequence: Lịch sử hồ sơ lâm sàng</span>
              </div>
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/state-diagrams/medical-record.png')">
                <img src="../../docs/design/state-diagrams/medical-record.png" onerror="this.style.height='50px'">
                <span>Trạng thái: Hồ sơ khám</span>
              </div>
            </div>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor U as Bác sĩ / Bệnh nhân
  participant API as ClinicalController
  participant SVC as ClinicalService
  participant DB as MySQL

  U->>API: GET /medical-records?patientId=
  API->>API: Xác thực JWT — trích xuất vai trò và danh tính
  API->>SVC: xemLichSu(patientId, actor)
  SVC->>DB: BEGIN TRANSACTION
  SVC->>DB: Kiểm tra quan hệ điều trị hoặc sở hữu hồ sơ

  alt Không có quyền truy cập
    SVC->>DB: ROLLBACK
    SVC-->>API: 403 FORBIDDEN
    API-->>U: Từ chối — không có quan hệ điều trị
  else Hợp lệ
    SVC->>DB: INSERT audit_event — READ (fail-closed)
    SVC->>DB: SELECT bản được phép theo vai trò
    SVC->>DB: COMMIT
    SVC-->>API: Danh sách đã lọc theo quyền
    API-->>U: 200 Danh sách lịch sử
  end
              </div>
            </div>
            <div class="fr-links">
              <a href="diagrams.html#seq-diag">→ Sơ đồ Sequence</a>
              <a href="diagrams.html#erd-diag">→ ERD</a>
            </div>
          </div></td>
        </tr>

        <tr class="fr-row" onclick="toggleFR('FR-13')">
          <td><strong>FR-13</strong><span class="fr-arr" id="arr-FR-13">▸</span></td>
          <td>Hồ sơ khám</td>
          <td><span class="badge bm5">M05</span></td>
          <td>KHI bác sĩ hoàn tất hồ sơ, hệ thống PHẢI đánh dấu FINAL bất biến; bổ sung tạo bản ghi mới</td>
          <td>UC-13</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-13">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">KHI</span> bác sĩ hoàn tất hồ sơ khám, hệ thống <span class="kw-shall">PHẢI</span> đánh dấu hồ sơ là FINAL và bất biến (không cho phép sửa trực tiếp). <span class="kw-ears">NẾU</span> cần bổ sung, hệ thống <span class="kw-shall">PHẢI</span> tạo bản ghi mới với số phiên bản mới, lý do bổ sung và tham chiếu đến bản FINAL trước.</p>
            <div class="fr-diag-row">
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/sequence-diagrams/medical-record.png')">
                <img src="../../docs/design/sequence-diagrams/medical-record.png" onerror="this.style.height='50px'">
                <span>Sequence: Hồ sơ khám chi tiết</span>
              </div>
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/state-diagrams/medical-record.png')">
                <img src="../../docs/design/state-diagrams/medical-record.png" onerror="this.style.height='50px'">
                <span>Trạng thái: Hồ sơ khám</span>
              </div>
            </div>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor D as Bác sĩ
  participant API as MedicalRecordController
  participant SVC as MedicalRecordService
  participant DB as MySQL

  D->>API: PUT /medical-records/{id}/finalize
  API->>API: Xác thực JWT — role DOCTOR
  API->>SVC: hoanTatHoSo
  SVC->>DB: SELECT medical_record FOR UPDATE

  alt Hồ sơ đã FINAL
    SVC-->>API: 409 RECORD_IMMUTABLE
    API-->>D: Không thể sửa hồ sơ đã chốt
  else Hồ sơ ở DRAFT
    SVC->>DB: UPDATE status = FINAL
    SVC->>DB: INSERT audit_event — FINALIZED
    SVC->>DB: COMMIT
    API-->>D: 200 Hồ sơ đã chốt FINAL
  end

  Note over D,DB: Bổ sung: tạo amendment mới thay vì sửa trực tiếp
  D->>API: POST /medical-records — refId + reason
  SVC->>DB: INSERT medical_record — DRAFT version N+1
  API-->>D: 201 Bản bổ sung tạo thành công
              </div>
            </div>
            <div class="fr-links">
              <a href="usecases.html#uc-detail">→ Đặc tả UC-13</a>
              <a href="diagrams.html#seq-diag">→ Sơ đồ Sequence</a>
              <a href="diagrams.html#state-diag">→ Sơ đồ Trạng thái</a>
            </div>
          </div></td>
        </tr>

        <tr class="fr-row" onclick="toggleFR('FR-14')">
          <td><strong>FR-14</strong><span class="fr-arr" id="arr-FR-14">▸</span></td>
          <td>Đơn thuốc</td>
          <td><span class="badge bm5">M05</span></td>
          <td>KHI kê đơn thuốc, hệ thống PHẢI khóa trạng thái ISSUED bất biến; không ghi đè trực tiếp</td>
          <td>UC-14</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-14">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">KHI</span> bác sĩ kê đơn thuốc và xác nhận, hệ thống <span class="kw-shall">PHẢI</span> khóa đơn thuốc ở trạng thái ISSUED là bất biến. Mọi thay đổi sau đó <span class="kw-shall">PHẢI</span> được thực hiện bằng cách tạo đơn thuốc mới, không ghi đè trực tiếp lên đơn ISSUED.</p>
            <div class="fr-diag-row">
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/sequence-diagrams/prescription.png')">
                <img src="../../docs/design/sequence-diagrams/prescription.png" onerror="this.style.height='50px'">
                <span>Sequence: Kê đơn thuốc</span>
              </div>
            </div>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor D as Bác sĩ
  participant API as PrescriptionController
  participant SVC as PrescriptionService
  participant DB as MySQL

  D->>API: POST /prescriptions
  API->>API: Xác thực JWT — role DOCTOR
  API->>SVC: keDon
  SVC->>DB: SELECT encounter — kiểm tra quyền sở hữu

  alt Encounter không thuộc bác sĩ này
    SVC-->>API: 403 FORBIDDEN
    API-->>D: Không có quyền kê đơn
  else Hợp lệ
    SVC->>DB: INSERT prescription — ISSUED
    SVC->>DB: INSERT audit_event — PRESCRIPTION_ISSUED
    DB-->>SVC: OK
    SVC-->>API: Đơn thuốc đã kê
    API-->>D: 201 Created
  end

  Note over D,DB: Đơn ISSUED bất biến — sửa bằng cách tạo đơn mới
  D->>API: POST /prescriptions — đơn thay thế
  API-->>D: 201 Đơn thuốc thay thế
              </div>
            </div>
            <div class="fr-links">
              <a href="diagrams.html#seq-diag">→ Sơ đồ Sequence</a>
            </div>
          </div></td>
        </tr>

        <tr class="fr-row" onclick="toggleFR('FR-15')">
          <td><strong>FR-15</strong><span class="fr-arr" id="arr-FR-15">▸</span></td>
          <td>Lịch sử hồ sơ</td>
          <td><span class="badge bm5">M05</span></td>
          <td>KHI truy vấn lịch sử, hệ thống PHẢI trả về bản ghi có phiên bản kèm audit trail</td>
          <td>UC-15</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-15">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">KHI</span> người dùng được phân quyền tra cứu lịch sử hồ sơ, hệ thống <span class="kw-shall">PHẢI</span> trả về danh sách đầy đủ các phiên bản bệnh án theo thứ tự thời gian kèm audit trail. Mỗi bản ghi <span class="kw-shall">PHẢI</span> hiển thị số phiên bản, thời điểm tạo và người tạo.</p>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor U as Người dùng được phép
  participant API as MedicalRecordController
  participant SVC as MedicalRecordService
  participant DB as MySQL

  U->>API: GET /medical-records?patientId=&encounterId=
  API->>API: Xác thực JWT và vai trò
  API->>SVC: layLichSuHoSo(patientId, userId, role)
  SVC->>DB: Kiểm tra quan hệ quyền truy cập hồ sơ

  alt Không có quyền truy cập
    SVC->>DB: INSERT audit_event (DENIED)
    SVC-->>API: 403 FORBIDDEN
    API-->>U: Không có quyền xem hồ sơ
  else Có quyền truy cập
    SVC->>DB: INSERT audit_event (READ)
    SVC->>DB: SELECT records ORDER BY version ASC
    DB-->>SVC: Tất cả phiên bản + metadata
    SVC-->>API: Danh sách phiên bản + audit trail
    API-->>U: 200 Lịch sử hồ sơ
  end
              </div>
            </div>
            <div class="fr-links">
              <a href="diagrams.html#uc-diag">→ Sơ đồ Use Case (nhóm M05)</a>
            </div>
          </div></td>
        </tr>

        <!-- ══ M06 Thông báo ══ -->
        <tr class="fr-row" onclick="toggleFR('FR-16')">
          <td><strong>FR-16</strong><span class="fr-arr" id="arr-FR-16">▸</span></td>
          <td>Thông báo</td>
          <td><span class="badge bm6">M06</span></td>
          <td>KHI trạng thái lịch hẹn thay đổi, hệ thống PHẢI đưa thông báo vào hàng đợi outbox</td>
          <td>UC-16</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-16">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">KHI</span> trạng thái lịch hẹn thay đổi (tạo mới, đổi lịch hoặc hủy), hệ thống <span class="kw-shall">PHẢI</span> đưa một job thông báo vào hàng đợi outbox trong cùng giao dịch. Job thông báo <span class="kw-shall">PHẢI</span> độc lập với giao dịch chính — lỗi gửi thông báo không được rollback lịch (theo BR-07).</p>
            <div class="fr-diag-row">
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/sequence-diagrams/notifications.png')">
                <img src="../../docs/design/sequence-diagrams/notifications.png" onerror="this.style.height='50px'">
                <span>Sequence: Thông báo &amp; Outbox</span>
              </div>
            </div>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor U as Người dùng
  participant API as AppointmentController
  participant SVC as AppointmentService
  participant DB as MySQL
  participant W as OutboxWorker
  participant NS as NotificationService

  U->>API: POST/PUT /appointments — thay đổi trạng thái
  API->>SVC: capNhatLich
  SVC->>DB: BEGIN TRANSACTION
  SVC->>DB: UPDATE appointment — trạng thái mới
  SVC->>DB: INSERT outbox_job — cùng giao dịch
  SVC->>DB: COMMIT
  API-->>U: 200 Cập nhật thành công

  Note over W,NS: Outbox worker độc lập — lỗi gửi không rollback lịch
  W->>DB: SELECT outbox_job chưa xử lý
  W->>NS: gửiThongBao
  NS-->>W: OK
  W->>DB: UPDATE outbox_job — SENT
              </div>
            </div>
            <div class="fr-links">
              <a href="diagrams.html#seq-diag">→ Sơ đồ Sequence</a>
            </div>
          </div></td>
        </tr>

        <!-- ══ M07 Audit ══ -->
        <tr class="fr-row" onclick="toggleFR('FR-17')">
          <td><strong>FR-17</strong><span class="fr-arr" id="arr-FR-17">▸</span></td>
          <td>Ghi audit sự kiện</td>
          <td><span class="badge bm7">M07</span></td>
          <td>KHI dữ liệu nhạy cảm bị truy cập/sửa hoặc bị DENIED, hệ thống PHẢI ghi audit nguyên tử</td>
          <td>UC-17</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-17">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">KHI</span> dữ liệu nhạy cảm bị truy cập, sửa đổi, hoặc khi quyền truy cập bị DENIED, hệ thống <span class="kw-shall">PHẢI</span> ghi sự kiện audit nguyên tử trong cùng giao dịch. <span class="kw-ears">NẾU</span> ghi audit thất bại, hệ thống <span class="kw-shall">PHẢI</span> rollback toàn bộ thao tác (fail-closed).</p>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor A as Người dùng
  participant API as Controller
  participant Aspect as AuditAspect
  participant SVC as Service
  participant DB as MySQL

  A->>API: Thao tác dữ liệu nhạy cảm
  API->>Aspect: intercept — trước khi thực thi
  Aspect->>SVC: gọi thao tác chính
  SVC->>DB: BEGIN TRANSACTION
  SVC->>DB: Thao tác nghiệp vụ
  Aspect->>DB: INSERT audit_event — cùng giao dịch

  alt Ghi audit thất bại
    DB-->>Aspect: lỗi DB
    Aspect->>DB: ROLLBACK
    API-->>A: 500 AUDIT_FAILED — fail-closed
  else Thành công
    SVC->>DB: COMMIT
    API-->>A: 200 Thành công
  end
              </div>
            </div>
            <div class="fr-links">
              <a href="diagrams.html#uc-diag">→ Sơ đồ Use Case (nhóm M07)</a>
              <a href="testing.html#pcl">→ TC-A14 (lỗi BE-01)</a>
            </div>
          </div></td>
        </tr>

        <tr class="fr-row" onclick="toggleFR('FR-18')">
          <td><strong>FR-18</strong><span class="fr-arr" id="arr-FR-18">▸</span></td>
          <td>Tra cứu audit</td>
          <td><span class="badge bm7">M07</span></td>
          <td>KHI AUDITOR truy vấn nhật ký audit, hệ thống PHẢI trả về sự kiện đã lọc không có PHI</td>
          <td>UC-18</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-18">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">KHI</span> người dùng có vai trò AUDITOR truy vấn nhật ký audit với bộ lọc (thời gian, loại sự kiện, actor), hệ thống <span class="kw-shall">PHẢI</span> trả về danh sách sự kiện đã lọc. Dữ liệu trả về <span class="kw-shall">PHẢI</span> không chứa PHI (thông tin định danh cá nhân của bệnh nhân).</p>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor AU as Auditor
  participant API as AuditController
  participant SVC as AuditService
  participant DB as MySQL

  AU->>API: GET /audit-events?từ=&đến=&loại=
  API->>API: Xác thực JWT — role AUDITOR

  alt Không có quyền AUDITOR
    API-->>AU: 403 FORBIDDEN
  else Hợp lệ
    API->>SVC: traCuuAudit
    SVC->>DB: SELECT audit_event — lọc theo bộ lọc
    DB-->>SVC: Danh sách sự kiện
    SVC->>SVC: Che PHI — ẩn tên và CCCD bệnh nhân
    SVC-->>API: Danh sách đã lọc
    API-->>AU: 200 Sự kiện audit — không chứa PHI
  end
              </div>
            </div>
            <div class="fr-links">
              <a href="diagrams.html#uc-diag">→ Sơ đồ Use Case (nhóm M07)</a>
            </div>
          </div></td>
        </tr>

        <!-- ══ M08 Hàng đợi ══ -->
        <tr class="fr-row" onclick="toggleFR('FR-19')">
          <td><strong>FR-19</strong><span class="fr-arr" id="arr-FR-19">▸</span></td>
          <td>Check-in</td>
          <td><span class="badge bm8">M08</span></td>
          <td>KHI lễ tân check-in, hệ thống PHẢI tạo đúng MỘT phiếu trong cửa sổ hợp lệ theo nguyên tử</td>
          <td>UC-19</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-19">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">KHI</span> lễ tân thực hiện check-in cho bệnh nhân có lịch CONFIRMED, hệ thống <span class="kw-shall">PHẢI</span> (1) kiểm tra thời điểm nằm trong cửa sổ cho phép ([T−15 phút, T+15 phút) quanh giờ hẹn), (2) tạo đúng MỘT phiếu hàng đợi WAITING — tất cả trong giao dịch nguyên tử. Yêu cầu check-in thứ hai cho cùng lịch <span class="kw-shall">PHẢI</span> bị từ chối.</p>
            <div class="fr-diag-row">
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/sequence-diagrams/checkin-and-queue.png')">
                <img src="../../docs/design/sequence-diagrams/checkin-and-queue.png" onerror="this.style.height='50px'">
                <span>Sequence: Check-in &amp; Hàng đợi</span>
              </div>
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/state-diagrams/queue-ticket.png')">
                <img src="../../docs/design/state-diagrams/queue-ticket.png" onerror="this.style.height='50px'">
                <span>Trạng thái: Phiếu chờ</span>
              </div>
            </div>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor R as Lễ tân
  participant API as CheckInController
  participant SVC as CheckInService
  participant DB as MySQL

  R->>API: POST /appointments/{id}/check-in
  API->>API: Xác thực JWT — role RECEPTIONIST
  API->>SVC: checkIn
  SVC->>DB: BEGIN TRANSACTION
  SVC->>DB: SELECT appointment FOR UPDATE

  alt Ngoài cửa sổ T±15 phút
    SVC->>DB: ROLLBACK
    API-->>R: 422 OUTSIDE_CHECKIN_WINDOW
  else Đã check-in rồi
    SVC->>DB: ROLLBACK
    API-->>R: 409 ALREADY_CHECKED_IN
  else Hợp lệ
    SVC->>DB: UPDATE appointment — CHECKED_IN
    SVC->>DB: INSERT queue_ticket — WAITING
    SVC->>DB: COMMIT
    API-->>R: 201 Check-in thành công
  end
              </div>
            </div>
            <div class="fr-links">
              <a href="usecases.html#uc-detail">→ Đặc tả UC-19</a>
              <a href="diagrams.html#seq-diag">→ Sơ đồ Sequence</a>
              <a href="diagrams.html#state-diag">→ Sơ đồ Trạng thái</a>
            </div>
          </div></td>
        </tr>

        <tr class="fr-row" onclick="toggleFR('FR-20')">
          <td><strong>FR-20</strong><span class="fr-arr" id="arr-FR-20">▸</span></td>
          <td>Hàng đợi / Gọi lượt</td>
          <td><span class="badge bm8">M08</span></td>
          <td>KHI bác sĩ gọi bệnh nhân tiếp, hệ thống PHẢI lấy từ FIFO và cập nhật trạng thái; rỗng trả 204</td>
          <td>UC-20</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-20">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">KHI</span> bác sĩ gọi bệnh nhân tiếp theo, hệ thống <span class="kw-shall">PHẢI</span> lấy phiếu WAITING đầu tiên theo thứ tự FIFO trong hàng đợi của bác sĩ trong ngày và chuyển sang IN_SERVICE. <span class="kw-ears">NẾU</span> hàng đợi rỗng, hệ thống <span class="kw-shall">PHẢI</span> trả về 204 No Content.</p>
            <div class="fr-diag-row">
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/sequence-diagrams/checkin-and-queue.png')">
                <img src="../../docs/design/sequence-diagrams/checkin-and-queue.png" onerror="this.style.height='50px'">
                <span>Sequence: Check-in &amp; Hàng đợi</span>
              </div>
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/state-diagrams/queue-ticket.png')">
                <img src="../../docs/design/state-diagrams/queue-ticket.png" onerror="this.style.height='50px'">
                <span>Trạng thái: Phiếu chờ</span>
              </div>
            </div>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor D as Bác sĩ
  participant API as QueueController
  participant SVC as QueueService
  participant DB as MySQL

  D->>API: POST /queue/next
  API->>API: Xác thực JWT — role DOCTOR
  API->>SVC: goiLuotTiep
  SVC->>DB: SELECT queue_ticket — WAITING FIFO FOR UPDATE

  alt Hàng đợi rỗng
    SVC-->>API: Không có phiếu
    API-->>D: 204 No Content
  else Có phiếu tiếp theo
    SVC->>DB: UPDATE queue_ticket — IN_SERVICE
    SVC->>DB: UPDATE appointment — IN_PROGRESS
    SVC->>DB: COMMIT
    SVC-->>API: Thông tin bệnh nhân
    API-->>D: 200 Phiếu tiếp theo
  end
              </div>
            </div>
            <div class="fr-links">
              <a href="usecases.html#uc-detail">→ Đặc tả UC-20</a>
              <a href="diagrams.html#seq-diag">→ Sơ đồ Sequence</a>
              <a href="diagrams.html#state-diag">→ Sơ đồ Trạng thái</a>
            </div>
          </div></td>
        </tr>

        <tr class="fr-row" onclick="toggleFR('FR-21')">
          <td><strong>FR-21</strong><span class="fr-arr" id="arr-FR-21">▸</span></td>
          <td>Bỏ lượt</td>
          <td><span class="badge bm8">M08</span></td>
          <td>KHI phiếu bị bỏ, hệ thống PHẢI di chuyển xuống cuối hàng; không tạo phiếu mới</td>
          <td>UC-21</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-21">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">KHI</span> bác sĩ hoặc lễ tân đánh dấu bỏ lượt cho phiếu đang đầu hàng, hệ thống <span class="kw-shall">PHẢI</span> di chuyển phiếu đó xuống cuối hàng đợi với trạng thái SKIPPED. Hệ thống <span class="kw-shall">KHÔNG ĐƯỢC</span> tạo thêm phiếu mới.</p>
            <div class="fr-diag-row">
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/sequence-diagrams/skip-ticket.png')">
                <img src="../../docs/design/sequence-diagrams/skip-ticket.png" onerror="this.style.height='50px'">
                <span>Sequence: Bỏ lượt</span>
              </div>
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/state-diagrams/queue-ticket.png')">
                <img src="../../docs/design/state-diagrams/queue-ticket.png" onerror="this.style.height='50px'">
                <span>Trạng thái: Phiếu chờ</span>
              </div>
            </div>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor S as Bác sĩ hoặc Lễ tân
  participant API as QueueController
  participant SVC as QueueService
  participant DB as MySQL

  S->>API: POST /queue-tickets/skip
  API->>API: Xác thực JWT — DOCTOR hoặc RECEPTIONIST
  API->>SVC: boLuot
  SVC->>DB: BEGIN TRANSACTION
  SVC->>DB: SELECT queue_ticket FOR UPDATE

  alt Phiếu không ở WAITING
    SVC->>DB: ROLLBACK
    API-->>S: 409 INVALID_STATE
  else Hợp lệ
    SVC->>DB: UPDATE queue_ticket — SKIPPED
    SVC->>DB: UPDATE sort_order — xuống cuối hàng
    SVC->>DB: COMMIT
    API-->>S: 200 Phiếu đã chuyển xuống cuối
  end
              </div>
            </div>
            <div class="fr-links">
              <a href="diagrams.html#seq-diag">→ Sơ đồ Sequence</a>
              <a href="diagrams.html#state-diag">→ Sơ đồ Trạng thái</a>
            </div>
          </div></td>
        </tr>

        <tr class="fr-row" onclick="toggleFR('FR-22')">
          <td><strong>FR-22</strong><span class="fr-arr" id="arr-FR-22">▸</span></td>
          <td>Hoàn tất lượt</td>
          <td><span class="badge bm8">M08</span></td>
          <td>KHI encounter kết thúc, hệ thống PHẢI hoàn tất phiếu và đồng bộ trạng thái lịch hẹn</td>
          <td>UC-22</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-22">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">KHI</span> encounter kết thúc (bác sĩ hoàn tất buổi khám), hệ thống <span class="kw-shall">PHẢI</span> đồng thời hoàn tất phiếu hàng đợi (COMPLETED) và đồng bộ trạng thái lịch hẹn tương ứng sang COMPLETED trong một giao dịch.</p>
            <div class="fr-diag-row">
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/sequence-diagrams/consultation-progress.png')">
                <img src="../../docs/design/sequence-diagrams/consultation-progress.png" onerror="this.style.height='50px'">
                <span>Sequence: Tiến trình buổi khám</span>
              </div>
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/state-diagrams/appointment.png')">
                <img src="../../docs/design/state-diagrams/appointment.png" onerror="this.style.height='50px'">
                <span>Trạng thái: Lịch hẹn</span>
              </div>
            </div>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor D as Bác sĩ
  participant API as EncounterController
  participant SVC as EncounterService
  participant DB as MySQL

  D->>API: POST /encounters/{id}/complete
  API->>API: Xác thực JWT — role DOCTOR
  API->>SVC: hoanTatLuot
  SVC->>DB: BEGIN TRANSACTION
  SVC->>DB: SELECT encounter FOR UPDATE

  alt Encounter không ở ACTIVE
    SVC->>DB: ROLLBACK
    API-->>D: 409 INVALID_STATE
  else Hợp lệ
    SVC->>DB: UPDATE encounter — COMPLETED
    SVC->>DB: UPDATE queue_ticket — COMPLETED
    SVC->>DB: UPDATE appointment — COMPLETED
    SVC->>DB: COMMIT
    API-->>D: 200 Buổi khám hoàn tất
  end
              </div>
            </div>
            <div class="fr-links">
              <a href="diagrams.html#seq-diag">→ Sơ đồ Sequence</a>
              <a href="diagrams.html#state-diag">→ Sơ đồ Trạng thái</a>
            </div>
          </div></td>
        </tr>

        <!-- ══ M09 Khám từ xa ══ -->
        <tr class="fr-row" onclick="toggleFR('FR-23')">
          <td><strong>FR-23</strong><span class="fr-arr" id="arr-FR-23">▸</span></td>
          <td>Phòng chờ &amp; Token từ xa</td>
          <td><span class="badge bm9">M09</span></td>
          <td>KHI vào phòng chờ, hệ thống PHẢI xác thực chấp thuận, phiên và cấp token phòng thời gian ngắn</td>
          <td>UC-23</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-23">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">KHI</span> bệnh nhân yêu cầu vào phòng chờ ảo cho lịch khám từ xa, hệ thống <span class="kw-shall">PHẢI</span> (1) xác thực sự đồng ý của bệnh nhân, (2) xác minh phiên khám hợp lệ, (3) phát hành room token có thời hạn ngắn gắn với người tham gia và phòng cụ thể.</p>
            <div class="fr-diag-row">
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/sequence-diagrams/telehealth.png')">
                <img src="../../docs/design/sequence-diagrams/telehealth.png" onerror="this.style.height='50px'">
                <span>Sequence: Phiên khám từ xa</span>
              </div>
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/activity-diagrams/telehealth-consultation.png')">
                <img src="../../docs/design/activity-diagrams/telehealth-consultation.png" onerror="this.style.height='50px'">
                <span>Activity: Quy trình khám từ xa</span>
              </div>
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/state-diagrams/telehealth.png')">
                <img src="../../docs/design/state-diagrams/telehealth.png" onerror="this.style.height='50px'">
                <span>Trạng thái: Phiên từ xa</span>
              </div>
            </div>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor P as Bệnh nhân
  participant API as TelehealthController
  participant SVC as TelehealthService
  participant DB as MySQL
  participant TS as TokenService

  P->>API: POST /telehealth/waiting-room
  API->>API: Xác thực JWT
  API->>SVC: vaoPhongCho
  SVC->>DB: SELECT appointment — xác minh phiên hợp lệ

  alt Chưa chấp thuận hoặc lịch không hợp lệ
    SVC-->>API: 403 CONSENT_REQUIRED
    API-->>P: Từ chối vào phòng chờ
  else Hợp lệ
    SVC->>TS: capRoomToken — TTL ngắn — gắn participantId
    TS-->>SVC: Room token đã ký
    SVC->>DB: INSERT telehealth_session — WAITING
    API-->>P: 200 Room token và thông tin phòng
  end
              </div>
            </div>
            <div class="fr-links">
              <a href="usecases.html#uc-detail">→ Đặc tả UC-23</a>
              <a href="diagrams.html#seq-diag">→ Sơ đồ Sequence</a>
              <a href="diagrams.html#act-diag">→ Sơ đồ Activity</a>
              <a href="diagrams.html#state-diag">→ Sơ đồ Trạng thái</a>
            </div>
          </div></td>
        </tr>

        <tr class="fr-row" onclick="toggleFR('FR-24')">
          <td><strong>FR-24</strong><span class="fr-arr" id="arr-FR-24">▸</span></td>
          <td>Phiên khám từ xa</td>
          <td><span class="badge bm9">M09</span></td>
          <td>KHI phiên hoạt động và bác sĩ bắt đầu, hệ thống PHẢI kích hoạt signaling; kết thúc chặn token mới</td>
          <td>UC-24</td>
        </tr>
        <tr class="fr-detail" id="detail-FR-24">
          <td colspan="5"><div class="fr-dcard">
            <p class="fr-desc-full"><span class="kw-ears">KHI</span> phiên khám từ xa đang hoạt động và bác sĩ bắt đầu cuộc gọi, hệ thống <span class="kw-shall">PHẢI</span> kích hoạt signaling WebRTC qua kênh được bảo mật. <span class="kw-ears">KHI</span> phiên kết thúc, hệ thống <span class="kw-shall">PHẢI</span> chặn cấp room token mới cho phiên đó; việc ngắt kết nối P2P đã thiết lập không được cưỡng chế.</p>
            <div class="fr-diag-row">
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/sequence-diagrams/telehealth.png')">
                <img src="../../docs/design/sequence-diagrams/telehealth.png" onerror="this.style.height='50px'">
                <span>Sequence: Phiên khám từ xa</span>
              </div>
              <div class="fr-diag-thumb" onclick="lb('../../docs/design/state-diagrams/telehealth.png')">
                <img src="../../docs/design/state-diagrams/telehealth.png" onerror="this.style.height='50px'">
                <span>Trạng thái: Phiên từ xa</span>
              </div>
            </div>
            <div class="mermaid-wrap" style="margin-top:14px">
              <div class="mermaid">
sequenceDiagram
  actor D as Bác sĩ
  actor P as Bệnh nhân
  participant API as TelehealthController
  participant SVC as TelehealthService
  participant WS as SignalingServer
  participant DB as MySQL

  D->>API: POST /telehealth/sessions/{id}/start
  API->>SVC: batDauPhien
  SVC->>DB: UPDATE telehealth_session — ACTIVE
  SVC->>WS: kichHoatSignaling — roomId
  WS-->>P: ICE candidate — SDP offer
  WS-->>D: ICE candidate — SDP answer

  Note over D,P: Kênh P2P WebRTC thiết lập trực tiếp

  D->>API: POST /telehealth/sessions/{id}/end
  API->>SVC: ketThucPhien
  SVC->>DB: UPDATE telehealth_session — ENDED
  SVC->>DB: UPDATE appointment — COMPLETED
  API-->>D: 200 Phiên đã kết thúc

  Note over SVC,DB: Kết nối P2P đã thiết lập không bị cưỡng chế ngắt
              </div>
            </div>
            <div class="fr-links">
              <a href="diagrams.html#seq-diag">→ Sơ đồ Sequence</a>
              <a href="diagrams.html#state-diag">→ Sơ đồ Trạng thái</a>
            </div>
          </div></td>
        </tr>

      </tbody>
    </table>
  </div>
</section>

<section class="section" id="nfr">
  <div class="sh"><span class="sh-ic">📐</span><div class="sh-txt"><h2>Yêu cầu phi chức năng (NFR)</h2><p>12 NFR · mỗi NFR có chỉ số đo lường định lượng và phương pháp đo</p></div></div>
  <div class="alert alert-warn">⚠ NFR là mục tiêu chất lượng. Kết quả đo thực tế xem tại Bảng PCL và Chương 5 báo cáo.</div>
  <div class="tbl-wrap">
    <table>
      <thead><tr><th>Mã</th><th>Chất lượng</th><th>Mục tiêu định lượng</th><th>Phương pháp đo</th><th>Trạng thái</th></tr></thead>
      <tbody>
        <tr><td><strong>NFR-01</strong></td><td>Hiệu năng</td><td>p95 ≤2s, p50 ≤500ms; tỷ lệ lỗi &lt;1%; 50 VU đồng thời; 10.000 bản ghi lịch; chạy liên tục 15 phút</td><td>k6/JMeter: script 50 VU ramping; xuất báo cáo p50/p95/p99 và error rate</td><td><span class="badge bstat-warn">Chưa đo</span></td></tr>
        <tr><td><strong>NFR-02</strong></td><td>Tính nhất quán</td><td>100 request đồng thời đặt cùng slot → đúng 1 CONFIRMED, 0 bản ghi trùng; SELECT FOR UPDATE / isolation REPEATABLE READ</td><td>Script 100 goroutine đồng thời; kiểm đếm bản ghi DB sau mỗi lần chạy</td><td><span class="badge bstat-ok">✓ Có bằng chứng</span></td></tr>
        <tr><td><strong>NFR-03</strong></td><td>Phân quyền</td><td>0 endpoint trả 200 khi truy cập ngang hàng (IDOR); 0 endpoint bỏ qua kiểm tra vai trò; lỗi phân quyền → 403 (không phải 200/500)</td><td>Ma trận 5 vai trò × 40+ endpoint; kiểm tra thăm dò cross-user và cross-role</td><td><span class="badge bstat-err">3 điểm thăm dò lỗi</span></td></tr>
        <tr><td><strong>NFR-04</strong></td><td>Bảo mật dữ liệu</td><td>TLS 1.3 trên mọi kết nối; mật khẩu BCrypt ≥12 rounds; trường nhạy cảm mã hóa AES-256; 0 token/PHI ghi vào log ứng dụng</td><td>Pentest tĩnh OWASP ZAP; kiểm tra cấu hình TLS; grep log tìm pattern PHI/JWT</td><td><span class="badge bstat-warn">Chưa nghiệm thu</span></td></tr>
        <tr><td><strong>NFR-05</strong></td><td>Audit</td><td>100% thao tác trên PHI sinh audit_event cùng giao dịch; lỗi INSERT audit → rollback toàn bộ; bảng audit_event append-only (0 UPDATE/DELETE)</td><td>Tiêm lỗi DB vào audit INSERT; kiểm tra tính đầy đủ nhật ký; xác minh không có lệnh UPDATE/DELETE trên bảng audit</td><td><span class="badge bstat-err">BE-01 còn lỗi</span></td></tr>
        <tr><td><strong>NFR-06</strong></td><td>Sao lưu &amp; Khôi phục</td><td>RTO ≤4h; RPO ≤1h; toàn vẹn FK 100% sau restore; backup mã hóa AES-256; kiểm tra ít nhất 1 lần/tháng</td><td>Diễn tập restore từ bản sao mới nhất; chạy PRAGMA foreign_key_check / SHOW ENGINE INNODB STATUS; đo thời gian thực tế</td><td><span class="badge bstat-warn">Chưa kiểm chứng</span></td></tr>
        <tr><td><strong>NFR-07</strong></td><td>Lỗi phụ thuộc</td><td>Lỗi DB → HTTP 503 trong ≤5s (không phải 200 giả); timeout kết nối DB ≤5s; 0 stack trace rò ra response client</td><td>Giả lập mất kết nối DB; chaos test ngắt Keycloak; kiểm tra response body không chứa exception message</td><td><span class="badge bstat-warn">Một phần</span></td></tr>
        <tr><td><strong>NFR-08</strong></td><td>Khả năng sử dụng</td><td>≥4/5 người thành thạo đặt lịch trong ≤3 phút; SUS score ≥68 (ngưỡng "tốt"); 0 lỗi nghiêm trọng buộc bỏ tác vụ</td><td>Phiên kiểm tra 5 người dùng thực; bấm giờ từng tác vụ; thu thập bảng hỏi SUS 10 mục</td><td><span class="badge bstat-warn">Chưa đo</span></td></tr>
        <tr><td><strong>NFR-09</strong></td><td>Độ sẵn sàng mạng</td><td>Banner offline hiển thị trong ≤10s khi mất mạng; form chưa gửi giữ nguyên dữ liệu; tự reconnect trong ≤30s khi có mạng lại</td><td>Ngắt network tab DevTools; quan sát banner và trạng thái form; đo thời gian reconnect</td><td><span class="badge bstat-warn">Chưa đo E2E</span></td></tr>
        <tr><td><strong>NFR-10</strong></td><td>Quản lý phiên bản</td><td>Mỗi breaking change gắn Git tag semver; OpenAPI 3.1 diff qua CI; sơ đồ UML đồng bộ với code tại thời điểm tag</td><td>Kiểm tra Git tag tồn tại cho mỗi release; so sánh OpenAPI spec giữa 2 tag liên tiếp; review UML thủ công</td><td><span class="badge bstat-info">Có trong mã nguồn</span></td></tr>
        <tr><td><strong>NFR-11</strong></td><td>Độ bao phủ kiểm thử</td><td>JaCoCo line coverage ≥60% (thực đo 77% — đạt); ≥1 test tranh chấp/endpoint giao dịch; ≥1 test phân quyền/vai trò</td><td>Báo cáo JaCoCo HTML; đếm test class @Concurrent; ma trận test phân quyền</td><td><span class="badge bstat-ok">✓ 77% line — đạt mục tiêu</span></td></tr>
        <tr><td><strong>NFR-12</strong></td><td>PHI &amp; Bí mật</td><td>0 PHI thật trong repo/log/screenshot demo; 0 secret/token lộ trong Git history; toàn bộ dữ liệu demo là tổng hợp giả</td><td>Chạy gitleaks trước push; grep log pattern CCCD/SĐT/email thật; rà soát screenshot trước nộp</td><td><span class="badge bstat-warn">Chưa nghiệm thu toàn diện</span></td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="section" id="br">
  <div class="sh"><span class="sh-ic">⚖️</span><div class="sh-txt"><h2>Quy tắc nghiệp vụ trọng yếu</h2><p>BR-01…BR-09 · áp dụng bất kể vai trò, không thể bỏ qua bởi giao diện người dùng</p></div></div>
  <div class="rules-list">
    <div class="rule"><div class="rule-id">BR-01</div><div class="rule-body">Thời gian lưu <strong>UTC</strong>, hiển thị theo <strong>Asia/Ho_Chi_Minh (UTC+7)</strong>; khoảng lịch dùng <strong>[start, end)</strong> — start bao gồm, end loại trừ — để hai slot kề nhau không bị xem là trùng.</div></div>
    <div class="rule"><div class="rule-id">BR-02</div><div class="rule-body">Một bệnh nhân và một bác sĩ <strong>không có hai lịch giao nhau</strong> ở trạng thái <strong>PENDING hoặc CONFIRMED</strong>. Đặt/đổi lịch phải kiểm tra lại tính trống bằng <code>SELECT FOR UPDATE</code> trong giao dịch; <strong>đổi thất bại giữ nguyên lịch cũ</strong>. Lịch CANCELLED/COMPLETED không tham gia kiểm tra.</div></div>
    <div class="rule"><div class="rule-id">BR-03</div><div class="rule-body">Đổi/hủy chỉ cho lịch <strong>CONFIRMED</strong> còn ít nhất <strong>2 giờ</strong> trước giờ bắt đầu. Check-in chỉ chấp nhận trong cửa sổ <strong>[T−15 phút, T+15 phút)</strong>; NO_SHOW chỉ áp dụng cho lịch CONFIRMED từ T+15 phút, không áp dụng cho lịch đã check-in.</div></div>
    <div class="rule"><div class="rule-id">BR-04</div><div class="rule-body">Hàng đợi theo bác sĩ/ngày, <strong>FIFO theo thời điểm check-in timestamp</strong>; bỏ lượt chuyển chính ticket đó xuống cuối hàng, <strong>không tạo ticket mới</strong>; ticket bỏ lượt chuyển sang trạng thái SKIPPED.</div></div>
    <div class="rule"><div class="rule-id">BR-05</div><div class="rule-body">Bệnh án <strong>FINAL</strong> và đơn <strong>ISSUED</strong> là bất biến — <strong>không UPDATE trực tiếp</strong>. Bổ sung bệnh án tạo bản <strong>DRAFT mới (version = N+1)</strong>, kèm <code>refId</code> trỏ về bản FINAL gốc và lý do bổ sung; đơn thuốc thay thế tạo đơn mới hoàn toàn.</div></div>
    <div class="rule"><div class="rule-id">BR-06</div><div class="rule-body">Ba hành động cuối buổi khám là <strong>độc lập nhau</strong>: (1) chốt bệnh án FINAL, (2) kết thúc media/ghi hình, (3) hoàn tất Encounter. Encounter chỉ được COMPLETE khi trạng thái là ACTIVE; bệnh án và đơn thuốc không bắt buộc phải FINAL trước.</div></div>
    <div class="rule"><div class="rule-id">BR-07</div><div class="rule-body">Thông báo được đưa vào <strong>outbox trong cùng giao dịch</strong>, gửi thực tế <strong>sau commit</strong>; lỗi gửi <strong>không rollback lịch</strong>. Worker nhắc lịch phải kiểm tra <strong>idempotency key</strong> để bỏ qua job đã xử lý hoặc lịch đã thay đổi trạng thái.</div></div>
    <div class="rule"><div class="rule-id">BR-08</div><div class="rule-body">Quyền quyết định bởi <strong>vai trò VÀ quan hệ tài nguyên</strong> (ví dụ: bác sĩ chỉ truy cập hồ sơ bệnh nhân thuộc lịch của mình). Audit không chứa PHI/token; đọc dữ liệu nhạy cảm bắt buộc ghi audit — thất bại → không trả dữ liệu (<strong>fail-closed</strong>).</div></div>
    <div class="rule"><div class="rule-id">BR-09</div><div class="rule-body">Token phòng có TTL <strong>≤15 phút</strong>, gắn cứng <code>participantId</code> và <code>roomId</code>. Kết thúc phiên chặn cấp token mới cho phiên đó; signaling WebRTC <strong>không đồng nghĩa cưỡng chế ngắt</strong> kết nối P2P đã thiết lập.</div></div>
  </div>
</section>
`;
