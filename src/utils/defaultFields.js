const defaultFields = [
  {
    id: 'customers',
    name: 'Khách hàng',
    fields: [
      { id: 'ho_ten', label: 'Họ và tên', type: 'text' },
      { id: 'ngay_sinh', label: 'Ngày sinh', type: 'text' },
      { id: 'so_cmnd', label: 'Số CMND/CCCD', type: 'text' },
      { id: 'ngay_cap', label: 'Ngày cấp', type: 'text' },
      { id: 'noi_cap', label: 'Nơi cấp', type: 'text' },
      { id: 'dia_chi_thuong_tru', label: 'Địa chỉ thường trú', type: 'text' },
      { id: 'dia_chi_tam_tru', label: 'Địa chỉ tạm trú', type: 'text' },
      { id: 'so_dien_thoai', label: 'Số điện thoại', type: 'text' },
      { id: 'email', label: 'Email', type: 'text' },
      { id: 'tinh_trang_hon_nhan', label: 'Tình trạng hôn nhân', type: 'text' },
    ],
  },
  {
    id: 'spouse',
    name: 'Vợ/Chồng Khách hàng',
    fields: [
        { id: 'ho_ten_vo_chong', label: 'Họ tên Vợ/Chồng', type: 'text' },
        { id: 'ngay_sinh_vo_chong', label: 'Ngày sinh Vợ/Chồng', type: 'text' },
        { id: 'so_cmnd_vo_chong', label: 'Số CMND/CCCD Vợ/Chồng', type: 'text' },
        { id: 'sdt_vo_chong', label: 'SĐT Vợ/Chồng', type: 'text' },
    ]
  },
  {
    id: 'loans',
    name: 'Thông tin Khoản vay',
    fields: [
      { id: 'so_hdtd', label: 'Số Hợp đồng tín dụng', type: 'text' },
      { id: 'ngay_hdtd', label: 'Ngày Hợp đồng tín dụng', type: 'text' },
      { id: 'so_tien_vay', label: 'Số tiền vay', type: 'number' },
      { id: 'so_tien_vay_bang_chu', label: 'Số tiền vay (bằng chữ)', type: 'text' },
      { id: 'lai_suat', label: 'Lãi suất (%/năm)', type: 'text' },
      { id: 'lai_suat_bang_chu', label: 'Lãi suất (bằng chữ)', type: 'text' },
      { id: 'thoi_han_vay', label: 'Thời hạn vay (tháng)', type: 'text' },
      { id: 'muc_dich_vay', label: 'Mục đích vay vốn', type: 'text' },
      { id: 'phuong_thuc_tra_no', label: 'Phương thức trả nợ', type: 'text' },
      { id: 'ngay_giai_ngan', label: 'Ngày giải ngân', type: 'text' },
    ],
  },
  {
    id: 'collaterals',
    name: 'Tài sản đảm bảo',
    fields: [
      { id: 'loai_tsdb', label: 'Loại tài sản', type: 'text', placeholder: 'VD: Quyền sử dụng đất, Xe ô tô...' },
      { id: 'chu_so_huu', label: 'Chủ sở hữu', type: 'text' },
      { id: 'mo_ta_tsdb', label: 'Mô tả tài sản', type: 'text', placeholder: 'VD: Thửa đất số 123, tờ bản đồ số 45' },
      { id: 'giay_to_phap_ly', label: 'Thông tin giấy tờ pháp lý', type: 'text', placeholder: 'VD: GCN QSDĐ số CH12345 do UBND...' },
      { id: 'gia_tri_dinh_gia', label: 'Giá trị định giá', type: 'number' },
      { id: 'gia_tri_dinh_gia_bang_chu', label: 'Giá trị định giá (bằng chữ)', type: 'text' },
    ],
  },
  {
    id: 'guarantors',
    name: 'Người bảo lãnh',
    fields: [
      { id: 'ho_ten_nbl', label: 'Họ tên Người bảo lãnh', type: 'text' },
      { id: 'ngay_sinh_nbl', label: 'Ngày sinh Người bảo lãnh', type: 'text' },
      { id: 'so_cmnd_nbl', label: 'Số CMND/CCCD Người bảo lãnh', type: 'text' },
      { id: 'quan_he_nbl', label: 'Quan hệ với khách hàng', type: 'text' },
      { id: 'dia_chi_nbl', label: 'Địa chỉ Người bảo lãnh', type: 'text' },
      { id: 'sdt_nbl', label: 'SĐT Người bảo lãnh', type: 'text' },
    ],
  },
  {
    id: 'general',
    name: 'Thông tin chung',
    fields: [
        { id: 'chi_nhanh_ngan_hang', label: 'Chi nhánh Ngân hàng', type: 'text' },
        { id: 'dia_chi_ngan_hang', label: 'Địa chỉ Ngân hàng', type: 'text' },
        { id: 'nguoi_dai_dien_ngan_hang', label: 'Người đại diện ngân hàng', type: 'text' },
        { id: 'chuc_vu_dai_dien', label: 'Chức vụ người đại diện', type: 'text' },
        { id: 'ngay_hien_tai', label: 'Ngày tháng năm hiện tại', type: 'text', placeholder: 'VD: ngày 25 tháng 12 năm 2023' }
    ]
  }
];

export default defaultFields;
