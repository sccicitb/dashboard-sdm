/* eslint-disable no-undef */
import { createClient } from '@supabase/supabase-js';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const FormatRupiah = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  }).format(amount);
}

function getFormattedDate(date = new Date()) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

function sortByStatus(data) {
  if (data.length === 0) return data

  const statusOrder = ['kontrak', 'negosiasi', 'proposal', 'inisiasi'];

  return data.sort((a, b) => {
    // First sort by status
    const statusComparison = statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);

    // If status is the same, sort by updated_at descending
    if (statusComparison === 0) {
      return new Date(b.updated_at) - new Date(a.updated_at);
    }

    return statusComparison;
  });
}

const formState = {
  name: "",
  partner: "",
  value: "",
  tax: "",
  status: "inisiasi",
  pic: "",
  note: "",
  outsource: "",
  updated_at: new Date().toISOString().split('T')[0]
}

const periodYear = ['2025', '2024', '2023', '2022', '2021', '2020']

const constant = {
  org: {
    SCCIC: 'SCCIC',
    IDS_LCI: 'IDSxLCI',
    IDH: 'IDH',
    MSP: 'Urbansolv',
    RESUME: 'RESUME',
  },
  action: {
    VIEW: 'view',
    ADD: 'add',
    RESUME: 'resume'
  }
}

const StatusColors = {
  kontrak: "green",
  negosiasi: "blue",
  proposal: "yellow",
  inisiasi: "white",
}

const StatusTextColors = {
  kontrak: "white",
  negosiasi: "white",
  proposal: "black",
  inisiasi: "black",
}

function App() {
  const [action, setAction] = useQueryState('action', { defaultValue: 'view' })
  const [organization, setOrganization] = useQueryState('org', { defaultValue: constant.org.SCCIC })
  const [search, setSearch] = useQueryState('search', { defaultValue: '' })
  const [periode, setPeriode] = useQueryState('periode', { defaultValue: 'all' })
  const [form, setForm] = useState({ ...formState })
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  const getResumeData = async () => {
    setLoading(true)
    let resumePeriod;

    if (periode === 'all') {
      resumePeriod = new Date().getFullYear()
    } else {
      resumePeriod = periode
    }

    let query = supabase.from('t_org_target').select().eq('period', resumePeriod)
    // let queryResume = supabase.rpc(
    //   'get_project_summary_by_organization'
    // );
    let queryResume = supabase.rpc(
      'get_project_summary_by_organization_period'
    ).eq('project_year', "2025");

    const { data: targetData } = await query
    const { data: resumeData } = await queryResume

    setData({ target: targetData, resume: resumeData })
    setLoading(false)
  }

  const getData = async () => {
    setLoading(true)
    let query = supabase.from('t_project').select().eq('organization', organization.toLocaleLowerCase()).order('updated_at', { ascending: true })

    if (search) {
      const searchTerm = `name.ilike.%${search}%,partner.ilike.%${search}%,status.ilike.%${search}%,pic.ilike.%${search}%,outsource.ilike.%${search}%`
      query = query.or(searchTerm);
    }

    if (periode !== 'all') {
      query = query.eq('year_updated', periode)
    }

    const { data } = await query
    setData(sortByStatus(data))
    setLoading(false)
  }

  const NavClick = (e, org) => {
    e.preventDefault();

    setData([])
    setOrganization(org)
    setAction(constant.action.VIEW)
  }

  const ViewResume = (e) => {
    e.preventDefault();
    setPeriode(2024)
    setOrganization("")
    setData({
      target: [],
      resume: []
    })
    setAction(constant.action.RESUME)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from('t_project').insert({
      name: form.name,
      partner: form.partner,
      value: form.value,
      tax: form.tax,
      status: form.status,
      pic: form.pic,
      note: form.note,
      outsource: form.outsource,
      organization: organization.toLocaleLowerCase(),
      updated_at: new Date(form.updated_at)
    })

    if (error) {
      console.error(error)
      alert(JSON.stringify(error, null, 2))
    }

    getData()
    setAction(constant.action.VIEW)
    setForm({ ...formState })
  };

  const handleEdit = (el) => {
    setForm(el)
    $('#editModal').modal('toggle')
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('t_project').update({
      name: form.name,
      partner: form.partner,
      value: form.value,
      tax: form.tax,
      status: form.status,
      pic: form.pic,
      note: form.note,
      outsource: form.outsource,
      updated_at: new Date(form.updated_at)
    }).eq('id', form.id)

    if (error) {
      console.error(error)
      alert(JSON.stringify(error, null, 2))
    }

    getData()
    setAction(constant.action.VIEW)
    setForm({ ...formState })
    $('#editModal').modal('toggle')
  }

  const handleDelete = (el) => {
    setForm(el)
    $('#deleteModal').modal('toggle')
  }

  const handleDeleteSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('t_project').delete().eq('id', form.id)

    if (error) {
      console.error(error)
      alert(JSON.stringify(error, null, 2))
    }

    getData()
    setAction(constant.action.VIEW)
    setForm({ ...formState })
    $('#deleteModal').modal('toggle')
  }

  const handleResumeEdit = (el) => {
    setForm(el)
    $('#editModalResume').modal('toggle')
  }

  const handleResumeUpdateSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('t_org_target').update({
      realization_q1: form.realization_q1,
      realization_q2: form.realization_q2,
      period: form.period,
      updated_at: new Date()
    }).eq('id', form.id)

    if (error) {
      console.error(error)
      alert(JSON.stringify(error, null, 2))
    }

    getResumeData()
    setAction(constant.action.RESUME)
    setForm({ ...formState })
    $('#editModalResume').modal('toggle')
  }

  useEffect(() => {
    if (action === constant.action.VIEW) {
      getData()
    } else if (action === constant.action.RESUME) {
      getResumeData()
    }
  }, [organization, search, periode, action])
  
  useEffect(() => {
    setForm({ ...formState })
  }, [action])

  return (
    <>
      <div className="dashboard section">
        <div className="col p-0">

          {/* sidebar */}
          <nav className="navbar navbar-expand-lg " style={{ background: "#fcfcfc", minHeight: '7vh' }}>
            <div className="navbar-brand icon-dash">
              <img src="img/logo.png" alt="" />
            </div>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link h4" href="#" onClick={(e) => NavClick(e, constant.org.SCCIC)} style={{ color: organization === constant.org.SCCIC ? '#6a070c' : 'black' }}>{constant.org.SCCIC}</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link h4" href="#" onClick={(e) => NavClick(e, constant.org.IDS_LCI)} style={{ color: organization === constant.org.IDS_LCI ? '#6a070c' : 'black' }}>{constant.org.IDS_LCI}</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link h4" href="#" onClick={(e) => NavClick(e, constant.org.MSP)} style={{ color: organization === constant.org.MSP ? '#6a070c' : 'black' }}>{constant.org.MSP}</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link h4" href="#" onClick={(e) => NavClick(e, constant.org.IDH)} style={{ color: organization === constant.org.IDH ? '#6a070c' : 'black' }}>{constant.org.IDH}</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link h4" href="#" onClick={ViewResume} style={{ color: action === constant.action.RESUME ? '#6a070c' : 'black' }}>Resume</a>
                </li>
              </ul>
            </div>
          </nav>

          {/* main content */}
          {
            action === constant.action.ADD && (
              <div className="col-lg-12 col-md-10 col-sm-8 maindoc">
                <div className="row">
                  <div className="col title">
                    <h1>ADD NEW DATA</h1>
                    <p>Create a new data and add them to this site.</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <section className="pagetambahdokter">
                      <div className="container">
                        <div className="row">
                          <div className="col">
                            <form className="add" onSubmit={handleSubmit}>
                              <div className="form-group">
                                <label htmlFor="partner" style={{ color: "rgb(216, 216, 216)" }} >Mitra</label>
                                <input type="text" className="form-control" id="partner" name="partner" value={form.partner} onChange={handleInputChange} required />
                                <div className="form-group">
                                  <label htmlFor="name" style={{ color: "rgb(216, 216, 216)" }} >Proyek</label>
                                  <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" value={form.name} onChange={handleInputChange} required />
                                </div>
                              </div>
                              <div className="form-group">
                                <label htmlFor="value" style={{ color: "rgb(216, 216, 216)" }} >Dana Kontrak</label>
                                <input type="text" className="form-control" id="phone" name="value" value={form.value} onChange={handleInputChange} required />
                              </div>
                              <div className="form-group">
                                <label htmlFor="tax" style={{ color: "rgb(216, 216, 216)" }} >Estimasi Pendapatan</label>
                                <input type="text" className="form-control" id="tax" name="tax" value={form.tax} onChange={handleInputChange} required />
                              </div>
                              <div className="form-group">
                                <label htmlFor="status" style={{ color: "rgb(216, 216, 216)" }} >Status</label>
                                <select name="status" value={form.status} onChange={handleInputChange} id="status">
                                  <option value="inisiasi">Inisiasi</option>
                                  <option value="proposal">Proposal</option>
                                  <option value="penawaran">Penawaran</option>
                                  <option value="kontrak">Kontrak</option>
                                </select>
                              </div>
                              <div className="form-group">
                                <label htmlFor="alamat" style={{ color: "rgb(216, 216, 216)" }} >PIC</label>
                                <input type="text" className="form-control" id="alamat" name="pic" value={form.pic} onChange={handleInputChange} required />
                              </div>
                              <div className="form-group">
                                <label htmlFor="note" style={{ color: "rgb(216, 216, 216)" }} >Catatan</label>
                                <input type="text" className="form-control" id="note" name="note" value={form.note} onChange={handleInputChange} />
                              </div>
                              <div className="form-group">
                                <label htmlFor="outsource" style={{ color: "rgb(216, 216, 216)" }} >Outsource</label>
                                <select name="outsource" className="form-control" id="outsource" value={form.outsource} onChange={handleInputChange}>
                                  <option value="">Select Outsource</option>
                                  <option value="SCCIC">SCCIC</option>
                                  <option value="IDSxLCI">IDSxLCI</option>
                                  <option value="Urban">Urban</option>
                                  <option value="IDH">IDH</option>
                                </select>
                              </div>
                              <div className="form-group">
                                <label htmlFor="updated_at" style={{ color: "rgb(216, 216, 216)" }}>Tanggal Update</label>
                                <input
                                  type="date"
                                  id="updated_at"
                                  name="updated_at"
                                  value={form.updated_at ? new Date(form.updated_at).toISOString().split('T')[0] : ''}
                                  onChange={handleInputChange}
                                  style={{ width: "100%" }}
                                /> <br />
                              </div>
                              <div className="button">
                                <button type="submit" className="btn submit" style={{ marginTop: "10px" }}>Submit</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            )
          }
          {
            action === constant.action.VIEW && (
              <div className="col-lg-12 col-md-10 col-sm-8 main container-fluid">
                <div className="row">
                  <div className="col title">
                    <h1>{organization}</h1>
                  </div>
                </div>
                <div className="row doctor">
                  <div className="selected-year d-flex justify-content-end align-self-center mr-5 ml-4">
                    <label htmlFor="search" >Search : </label>
                    <input id='search' value={search} onChange={e => setSearch(e.target.value)} />
                  </div>
                  <div className="selected-year d-flex justify-content-end align-self-center mr-5 ml-4">
                    <label htmlFor="periode">Periode : </label>
                    <select id="periode" name="periode" value={periode} onChange={e => setPeriode(e.target.value)} >
                      <option value="all">All</option>
                      {periodYear.map((el, idx) => <option key={idx} value={el}>{el}</option>)}
                    </select>
                  </div>
                  <div className="col buttonupdate">
                    <button onClick={() => setAction("add")}>
                      <span className="fa fa-plus-circle" style={{ fontSize: "20px" }}></span>
                      Add New Data
                    </button>
                  </div>
                </div>
                <br />
                <div className="doctorlist-title" style={{ height: "100vh" }}>
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Mitra</th>
                        <th>Proyek</th>
                        <th>Dana Kontrak</th>
                        <th>Estimasi Pendapatan</th>
                        <th>Status</th>
                        <th>PIC</th>
                        <th>Catatan</th>
                        <th>Outsource</th>
                        <th>Update</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody id="dokterList" style={{ borderTop: "1px #dee2e6 solid" }}>
                      {!loading && Array.isArray(data) &&
                        data.map((el, idx) => (
                          <tr key={idx} style={{ backgroundColor: StatusColors[el.status], borderBottom: "1px #dee2e6 solid" }}>
                            <td style={{ color: StatusTextColors[el.status] }} >{idx + 1}</td>
                            <td style={{ color: StatusTextColors[el.status] }} >{el.partner}</td>
                            <td style={{ color: StatusTextColors[el.status] }} >{el.name}</td>
                            <td style={{ color: StatusTextColors[el.status] }} >{FormatRupiah(el.value)}</td>
                            <td style={{ color: StatusTextColors[el.status] }} >{FormatRupiah(el.tax)}</td>
                            <td style={{ color: StatusTextColors[el.status] }} >{el.status}</td>
                            <td style={{ color: StatusTextColors[el.status] }} >{el.pic}</td>
                            <td style={{ color: StatusTextColors[el.status] }} >{el.note}</td>
                            <td style={{ color: StatusTextColors[el.status] }} >{el.outsource}</td>
                            <td style={{ color: StatusTextColors[el.status] }} >{getFormattedDate(new Date(el.updated_at))}</td>
                            <td>
                              <button
                                style={{
                                  backgroundColor: "Transparent",
                                  backgroundRepeat: "no-repeat",
                                  border: "none",
                                  cursor: "pointer",
                                  overflow: "hidden",
                                  marginRight: "12px",
                                }}
                                onClick={() => handleEdit(el)}
                              >
                                <i className="fa fa-pencil" style={{ fontSize: "24px", color: StatusTextColors[el.status], marginLeft: "5px" }} ></i>
                              </button>
                              <button
                                style={{
                                  backgroundColor: "Transparent",
                                  backgroundRepeat: "no-repeat",
                                  border: "none",
                                  cursor: "pointer",
                                  overflow: "hidden",
                                  marginRight: "12px",
                                }}
                                onClick={() => handleDelete(el)}
                              >
                                <i className="fa fa-trash" style={{ fontSize: "24px", color: StatusTextColors[el.status] }}></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            )
          }
          {
            action === constant.action.RESUME && (
              <>
                <div className="col-lg-12 col-md-10 col-sm-8 main container-fluid">
                  <div className="row">
                    <div className="col title">
                      <h1>{constant.action.RESUME.toUpperCase()}</h1>
                    </div>
                  </div>
                  <div className="row doctor mb-5">
                    <div className="selected-year d-flex justify-content-end align-self-center mr-5 ml-4">
                      <label htmlFor="periode">Periode : </label>
                      <select id="periode" name="periode" value={periode} onChange={e => setPeriode(e.target.value)} >
                        <option value="all">All</option>
                        {periodYear.map((el, idx) => <option key={idx} value={el}>{el}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="target-realisasi">
                    <div className="doctorlist-title">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Organisasi</th>
                            <th>Target</th>
                            <th>Realisasi (Q1)</th>
                            <th>Target (Q1)</th>
                            <th>Realisasi (Q2)</th>
                            <th>Target (Q2)</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody id="tabel-target">
                          {!loading && typeof data === 'object'  && 
                            data.target.map((el, idx) => (
                              <tr key={idx}>
                                <td>{el.name}</td>
                                <td>{FormatRupiah(el.target)}</td>
                                <td>{FormatRupiah(el.realization_q1)}</td>
                                <td>{FormatRupiah(el.target_q1)}</td>
                                <td>{FormatRupiah(el.realization_q2)}</td>
                                <td>{FormatRupiah(el.target_q2)}</td>
                                <td>
                                  <button
                                    style={{
                                      backgroundColor: "Transparent",
                                      backgroundRepeat: "no-repeat",
                                      border: "none",
                                      cursor: "pointer",
                                      overflow: "hidden",
                                      marginRight: "12px",
                                    }}
                                    onClick={() => handleResumeEdit(el)}
                                  >
                                    <i className="fa fa-pencil" style={{ fontSize: "24px", color: StatusTextColors[el.status], marginLeft: "5px" }} ></i>
                                  </button>
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <br />
                  <div className="status-proyek">
                    <div className="doctorlist-title">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Organisasi</th>
                            <th>Kontrak</th>
                            <th>Negosiasi</th>
                            <th>Proposal</th>
                            <th>Inisiasi</th>
                          </tr>
                        </thead>
                        <tbody id="tabel-proyek">
                          {!loading && typeof data === 'object'  && 
                            data.resume.map((el, idx) => (
                              <tr key={idx}>
                                <td>{el.organization}</td>
                                <td id="sccic-kontrak">{FormatRupiah(el.kontrak_value)}</td>
                                <td id="sccic-penawaran">{FormatRupiah(el.negosiasi_value)}</td>
                                <td id="sccic-proposal">{FormatRupiah(el.proposal_value)}</td>
                                <td id="sccic-inisiasi">{FormatRupiah(el.inisiasi_value)}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <br />
                  <div className="row d-flex justify-content-center" style={{ padding: "15px" }}>
                    <div className="doctorlist-title status-proyek col">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Organisasi</th>
                            <th colSpan="4" className="text-center">Jumlah Client</th>
                          </tr>
                        </thead>
                        <tbody id="tabel-proyek">
                        {!loading && typeof data === 'object'  && 
                            data.resume.map((el, idx) => (
                              <tr key={idx}>
                                <td>{el.organization}</td>
                                <td id="sccic-kontrak">{el.kontrak_count}</td>
                                <td id="sccic-penawaran">{el.negosiasi_count}</td>
                                <td id="sccic-proposal">{el.proposal_count}</td>
                                <td id="sccic-inisiasi">{el.inisiasi_count}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                    <div className="doctorlist-title status-proyek col">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Organisasi</th>
                            <th>Total Dana</th>
                          </tr>
                        </thead>
                        <tbody id="tabel-proyek">
                        {!loading && typeof data === 'object'  && 
                            data.resume.map((el, idx) => (
                              <tr key={idx}>
                                <td>{el.organization}</td>
                                <td id="sccic-dana">{FormatRupiah(el.total_value)}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <br />
                  <br />
                </div>
              </>

            )
          }

          {/* Update Modal */}
          <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Update Data </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <label htmlFor="partner" className="labs">Mitra</label>
                  <input type="text" id='partner' name="partner" value={form.partner} onChange={handleInputChange} /> <br />
                  <label htmlFor="name" className="labs">Proyek</label>
                  <input type="text" id='name' name="name" value={form.name} onChange={handleInputChange} /> <br />
                  <label htmlFor="value" className="labs">Dana Kontrak</label>
                  <input type="text" id="value" name="value" value={form.value} onChange={handleInputChange} required /> <br />
                  <label htmlFor="tax" className="labs">Estimasi Pendapatan</label>
                  <input type="text" id="tax" name="tax" value={form.tax} onChange={handleInputChange} required /> <br />
                  <label htmlFor="status" className="labs">Status:</label>
                  <select name="status" id="status" style={{ width: "100%" }} value={form.status} onChange={handleInputChange}>
                    <option value="inisiasi" style={{ backgroundColor: "white" }}>Inisiasi</option>
                    <option value="proposal" style={{ backgroundColor: "yellow" }}>Proposal</option>
                    <option value="negosiasi" style={{ backgroundColor: "blue", color: "white" }}>Negosiasi</option>
                    <option value="kontrak" style={{ backgroundColor: "green", color: "white" }}>Kontrak</option>
                  </select>
                  <label htmlFor="pic" className="labs">PIC</label>
                  <input type="text" id="pic" name='pic' value={form.pic} onChange={handleInputChange} /> <br />
                  <label htmlFor="note" className="labs">Catatan</label>
                  <input type="text" id="note" name='note' value={form.note} onChange={handleInputChange} /> <br />
                  <label htmlFor="outsource" className="labs">Outsource</label>
                  <select name="outsource" id="outsource" style={{ width: "100%" }} value={form.outsource} onChange={handleInputChange}>
                    <option value="">Select Outsource</option>
                    <option value="SCCIC">SCCIC</option>
                    <option value="IDSxLCI">IDSxLCI</option>
                    <option value="Urban">Urban</option>
                    <option value="IDH">IDH</option>
                  </select>
                  <label htmlFor="updated_at" className="labs">Tanggal Update</label>
                  <input
                    type="date"
                    id="updated_at"
                    name="updated_at"
                    value={form.updated_at ? new Date(form.updated_at.split('T')[0]).toISOString().split('T')[0] : ''}
                    onChange={handleInputChange}
                    style={{ width: "100%" }}
                  />
                  <br />
                </div>
                <div className="modal-footer">
                  <button id="UpDatadoc" className="UpDatadoc btn btn-success" type="button" onClick={handleUpdateSubmit}>Update Data</button>
                </div>
              </div>
            </div>
          </div>

          {/* Delete Modal */}
          <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Are You Sure to Delete Data?</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                </div>
                <div className="modal-btn">
                  <button id="Deldoc" className="DelDoc btn btn-danger" type="button" onClick={handleDeleteSubmit}>Delete Data</button>
                </div>
              </div>
            </div>
          </div>

          {/* Update Resume Modal */}
          <div className="modal fade" id="editModalResume" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Update Data </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <label htmlFor="organization" className="labs">Organisasi</label>
                  <p>{form.name.toUpperCase()}</p>
                  <label htmlFor="realization_q1" className="labs">Realisasi (Q1)</label>
                  <input type="text" id="realization_q1" name="realization_q1" value={form.realization_q1} onChange={handleInputChange} required /> <br />
                  <label htmlFor="target_q1" className="labs">Target (Q1)</label>
                  {/* <p>{FormatRupiah(form.target_q1)}</p> */}
                  <input type="text" id="target_q1" name="target_q1" value={form.target_q1} onChange={handleInputChange} required /> <br />
                  <label htmlFor="realization_q2" className="labs">Realisasi (Q2)</label>
                  <input type="text" id="realization_q2" name="realization_q2" value={form.realization_q2} onChange={handleInputChange} required /> <br />
                  <label htmlFor="target_q2" className="labs">Target (Q2)</label>
                  <input type="text" id="target_q2" name="target_q2" value={form.target_q2} onChange={handleInputChange} required /> <br />
                  {/* <p>{FormatRupiah(form.target_q2)}</p> */}
                </div>
                <div className="modal-footer">
                  <button id="UpDatadoc" className="UpDatadoc btn btn-success" type="button" onClick={handleResumeUpdateSubmit}>Update Data</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
