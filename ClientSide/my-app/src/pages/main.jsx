import React, { useState } from "react";
// import PDFViewer from 'pdf-viewer-reactjs'

var counterId = 1;
let stackObj = {};

function Main() {
    const [/*renderHelper*/, setRenderHelper] = useState(false);
    const [/*myBlob*/, setMyBlob] = useState(null);
    function download(blob, filename) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
    const updateStack = (id, status) => {
        stackObj[id].status = status;
        setRenderHelper(id);
    }
    const handleChange = async (event) => {
        const myFile = event.target.files[0];
        const myId = counterId;
        if (myFile) {
            stackObj[myId] = {
                file: myFile,
                id: myId,
                status: "Loading"
            }
            setRenderHelper(myId + "-")
            counterId++;
            const data = new FormData();
            data.append('somefile', myFile);
            await fetch(`https://accountsyup.com/officeApi/excetToPdfConvert`, {
                method: "POST",
                body: data,
                // headers: {
                //     // 'Content-Type': 'application/json'
                // }
            })
                .then((res) => {
                    updateStack(myId, "Success");
                    return res.blob();
                })
                .then(blob => {
                    let reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = function () {
                        let base64data = reader.result;
                        console.log(base64data)
                        setMyBlob(base64data);
                    }
                    download(blob, "Result")
                })
                .catch(err => updateStack(myId, "Error"));
        }
    }
    console.log(stackObj)
    return (
        <div>
            <h1 className="companyTitle" >Welcome <br />S.R. Laboratories</h1>
            <div>
                <div className="inputCont" >
                    <div className="inputItem excel" >
                        Excel To Pdf
                        <input value={""} type="file" onChange={(event) => handleChange(event)}
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />

                    </div>
                    <div className="inputItem word" >
                        Word To Pdf
                        <input value={""} type="file" onChange={(event) => handleChange(event)}
                            accept="application/msword, .doc, .docx" />
                    </div>
                    <div className="inputItem ppt" >
                        Powerpoint To Pdf
                        <input value={""} type="file" onChange={(event) => handleChange(event)}
                            accept="application/vnd.ms-powerpoint, .ppt, .pptx" />
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }} >
                <table className="apiStatusTable" >
                    <tr>
                        <th>File</th>
                        <th>Size</th>
                        <th>Status</th>
                    </tr>
                    {
                        Object.keys(stackObj).map(key => (
                            <tr key={key + (stackObj[key].status)} id={key + (stackObj[key].status)}>
                                <td className={stackObj[key].status}>{stackObj[key].file.name}</td>
                                <td className={stackObj[key].status}>{stackObj[key].file.size}</td>
                                <td className={stackObj[key].status}>{stackObj[key].status}</td>
                            </tr>
                        ))
                    }
                </table>
            </div>

            {/* <div>
                {<PDFViewer
                    document={{
                        url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',
                      
                    }}
                />}
            </div> */}


        </div>
    )
}
export default Main