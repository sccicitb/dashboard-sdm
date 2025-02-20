import { useQueryState } from 'nuqs'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

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
  const statusOrder = ['kontrak', 'negosiasi', 'proposal', 'inisiasi'];

  return data.sort((a, b) => {
    return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
  });
}

const formState = {
  name: "",
  partner: "",
  value: "",
  status: "inisiasi",
  pic: ""
}

const periodYear = ['2025', '2024', '2023', '2022', '2021', '2020']

const constant = {
  org: {
    SCCIC: 'SCCIC',
    IDS_LCI: 'IDSxLCI',
    IDH: 'IDH',
    MSP: 'MSP',
    RESUME: 'RESUME',
  },
  action: {
    VIEW: 'view',
    ADD: 'add'
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
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    setLoading(true)
    let query = supabase.from('t_project').select().eq('organization', organization.toLocaleLowerCase()).order('updated_at', { ascending: true })

    if (search) {
      const searchTerm = `name.ilike.%${search}%,partner.ilike.%${search}%,status.ilike.%${search}%,pic.ilike.%${search}%`
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

    setOrganization(org)
    setAction("view")
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
      status: form.status,
      pic: form.pic,
      organization: organization.toLocaleLowerCase(),
      updated_at: new Date()
    })

    if (error) {
      console.error(error)
      alert(JSON.stringify(error, null, 2))
    }

    getData()
    setAction('view')
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
      status: form.status,
      pic: form.pic,
      updated_at: new Date()
    }).eq('id', form.id)

    if (error) {
      console.error(error)
      alert(JSON.stringify(error, null, 2))
    }

    getData()
    setAction('view')
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
    setAction('view')
    setForm({ ...formState })
    $('#deleteModal').modal('toggle')
  }



  useEffect(() => {
    if (action === constant.action.VIEW) {
      getData()
    }
  }, [organization, search, periode])

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
                  <a className="nav-link h4" href="#" onClick={(e) => NavClick(e, constant.org.SCCIC)} style={{ color: organization === constant.org.SCCIC ? '#6a070c' : 'black' }}>SCCIC</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link h4" href="#" onClick={(e) => NavClick(e, constant.org.IDS_LCI)} style={{ color: organization === constant.org.IDS_LCI ? '#6a070c' : 'black' }}>IDSxLCI</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link h4" href="#" onClick={(e) => NavClick(e, constant.org.MSP)} style={{ color: organization === constant.org.MSP ? '#6a070c' : 'black' }}>MSP</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link h4" href="#" onClick={(e) => NavClick(e, constant.org.IDH)} style={{ color: organization === constant.org.IDH ? '#6a070c' : 'black' }}>IDH</a>
                </li>
                {/* <li className="nav-item">
                  <a className="nav-link" href="#" onClick={(e) => NavClick(e, constant.org.RESUME)} style={{ color: organization === constant.org.RESUME ? '#6a070c' : 'black' }}>Resume</a>
                </li> */}
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
                                <label htmlFor="email" style={{ color: "rgb(216, 216, 216)" }} >Proyek</label>
                                <input type="text" className="form-control" id="email" aria-describedby="emailHelp" name="name" value={form.name} onChange={handleInputChange} required />
                              </div>
                              <div className="form-group">
                                <label htmlFor="specialist" style={{ color: "rgb(216, 216, 216)" }} >Mitra</label>
                                <input type="text" className="form-control" id="specialist" name="partner" value={form.partner} onChange={handleInputChange} required />
                              </div>
                              <div className="form-group">
                                <label htmlFor="phone" style={{ color: "rgb(216, 216, 216)" }} >Nilai Dana</label>
                                <input type="text" className="form-control" id="phone" name="value" value={form.value} onChange={handleInputChange} required />
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
                <div className="doctorlist-title">
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Proyek</th>
                        <th>Mitra</th>
                        <th>Dana (Rp)</th>
                        <th>Status</th>
                        <th>PIC</th>
                        <th>Update</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody id="dokterList" style={{ borderTop: "1px #dee2e6 solid" }}>
                      {!loading &&
                        data.map((el, idx) => (
                          <tr key={idx} style={{ backgroundColor: StatusColors[el.status], borderBottom: "1px #dee2e6 solid" }}>
                            <td style={{ color: StatusTextColors[el.status] }} >{idx + 1}</td>
                            <td style={{ color: StatusTextColors[el.status] }} >{el.name}</td>
                            <td style={{ color: StatusTextColors[el.status] }} >{el.partner}</td>
                            <td style={{ color: StatusTextColors[el.status] }} >{FormatRupiah(el.value)}</td>
                            <td style={{ color: StatusTextColors[el.status] }} >{el.status}</td>
                            <td style={{ color: StatusTextColors[el.status] }} >{el.pic}</td>
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
                  <label htmlFor="name" className="labs">Proyek</label>
                  <input type="text" id='name' name="name" value={form.name} onChange={handleInputChange} /> <br />
                  <label htmlFor="partner" className="labs">Mitra</label>
                  <input type="text" id='partner' name="partner" value={form.partner} onChange={handleInputChange} /> <br />
                  <label htmlFor="value" className="labs">Dana (Rp)</label>
                  <input type="text" id="value" name="value" value={form.value} onChange={handleInputChange} required /> <br />
                  <label htmlFor="status" className="labs">Status:</label>
                  <select name="status" id="status" style={{ width: "100%" }} value={form.status} onChange={handleInputChange}>
                    <option value="inisiasi" style={{ backgroundColor: "white" }}>Inisiasi</option>
                    <option value="proposal" style={{ backgroundColor: "yellow" }}>Proposal</option>
                    <option value="negosiasi" style={{ backgroundColor: "blue", color: "white" }}>Negosiasi</option>
                    <option value="kontrak" style={{ backgroundColor: "green", color: "white" }}>Kontrak</option>
                  </select>
                  <label htmlFor="pic" className="labs">PIC</label>
                  <input type="text" id="pic" name='pic' value={form.pic} onChange={handleInputChange} /> <br />
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

        </div>
      </div>
    </>
  )
}

export default App
