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
  const statusOrder = ['kontrak', 'proposal', 'negosiasi', 'inisiasi'];

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

function App() {
  const [action, setAction] = useQueryState('action', { defaultValue: 'view' })
  const [organization, setOrganization] = useQueryState('org', { defaultValue: 'SCCIC' })
  const [form, setForm] = useState({ ...formState })
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    setLoading(true)
    const { data } = await supabase.from('t_project').select().eq('organization', organization.toLocaleLowerCase()).order('updated_at', { ascending: true })
    setData(sortByStatus(data))
    setLoading(false)
  }

  const NavClick = (e, org) => {
    e.preventDefault();

    setOrganization(org)
    setAction("view")
  }

  const OpenModal = (modal) => {
    $('#' + modal).modal('toggle')
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

  useEffect(() => {
    getData()
  }, [organization])

  useEffect(() => {
    setForm({ ...formState })
  }, [action])

  return (
    <>
      <div className="dashboard section">
        <div className="row all-content">

          {/* sidebar */}
          <div className="col-lg-2 col-md-2 col-sm-4 list">
            <div className="row icon-dash">
              <div className="col">
                <img src="img/logo.png" alt="" />
              </div>
            </div>
            <hr />
            <div className="all-list">
              <div className="row patient">
                <div className="col">
                  <a href="#" onClick={(e) => NavClick(e, "SCCIC")}>
                    <h6>SCCIC</h6>
                  </a>
                </div>
              </div>
              <hr />
              <div className="row doctor">
                <div className="col">
                  <a href="#" onClick={(e) => NavClick(e, "IDS")}>
                    <h6>IDS</h6>
                  </a>
                </div>
              </div>
              <hr />
              <div className="row tool">
                <div className="col">
                  <a href="#" onClick={(e) => NavClick(e, "IDH")}>
                    <h6>IDH</h6>
                  </a>
                </div>
              </div>
              <hr />
              <div className="row tool">
                <div className="col">
                  <a href="#" onClick={(e) => NavClick(e, "MSP")}>
                    <h6>MSP</h6>
                  </a>
                </div>
              </div>
              <hr />
              <div className="row tool">
                <div className="col">
                  <a href="#" onClick={(e) => NavClick(e, "LCI")}>
                    <h6>LCI</h6>
                  </a>
                </div>
              </div>
              <hr />
              <div className="row tool">
                <div className="col">
                  <a href="#" className='a-disabled'>
                    <h6>RESUME</h6>
                  </a>
                </div>
              </div>
              <hr />
              <div className="row tool">
                <div className="col">
                  <a href="#" className='a-disabled'>
                    <h6>SDM</h6>
                  </a>
                </div>
              </div>
              <hr />
              <br /> <br />
            </div>
          </div>

          {/* main content */}
          {
            action === 'add' ? (
              <div className="col-lg-10 col-md-10 col-sm-8 maindoc">
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
            ) : (
              <div className="col-lg-10 col-md-10 col-sm-8 main">
                <div className="row">
                  <div className="col title">
                    <h1>{organization}</h1>
                  </div>
                </div>
                <div className="row doctor">
                  <div className="col buttonupdate">

                    <button onClick={() => setAction("add")}>
                      <span className="fa fa-plus-circle" style={{ fontSize: "20px" }}></span>
                      Add New Data
                    </button>
                  </div>
                </div>
                <br />
                <div className="doctorlist-title">
                  <table className="table">
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
                    <tbody id="dokterList">
                      {!loading &&
                        data.map((el, idx) => (
                          <tr key={idx} style={{ backgroundColor: StatusColors[el.status] }}>
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
