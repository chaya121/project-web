export default function Register() {
    return (
        <div className="container mt-5">
            <div className="card p-4 shadow mx-auto" style={{ maxWidth: "500px" }}>
                <h3 className="mb-4 text-center">สมัครสมาชิก</h3>

                <input className="form-control mb-3" placeholder="ชื่อ-นามสกุล" />
                <input className="form-control mb-3" placeholder="รหัสนักศึกษา" />
                <input className="form-control mb-3" placeholder="อีเมล" />
                <input className="form-control mb-3" placeholder="เบอร์โทรศัพท์" />
                <input type="password" className="form-control mb-3" placeholder="รหัสผ่าน" />
                <input type="password" className="form-control mb-3" placeholder="ยืนยันรหัสผ่าน" />

                <button className="btn btn-success w-100">สมัครสมาชิก</button>
            </div>
        </div>
    );
}