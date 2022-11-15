import React, { useState } from "react";

function Main() {
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
    const handleChange = (event) => {
        setIsLoading(true)
        const myFile = event.target.files[0];
        const data = new FormData()
        data.append('somefile', myFile)
        fetch(`https://accountsyup.com/api/excetToPdfConvert`, {
            method: "POST",
            body: data,
            // headers: {
            //     'Content-Type': 'application/json'
            // }
        }).then((res) => {
            setIsLoading(false)
            return res.blob()
        })
            .then((blob) => download(blob, "Result"))
    }
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div>
            <h1 className="companyTitle" >Welcome <br />S.R. Laboratories</h1>
            <div>
                <div className="inputCont" >
                    <div className="inputItem excel" >
                        Excel To Pdf
                        <input type="file" onChange={(event) => handleChange(event)}
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                       
                    </div>
                    <div className="inputItem word" >
                        Word To Pdf
                        <input type="file" onChange={(event) => handleChange(event)} 
                        accept="application/msword, .doc, .docx"/>
                    </div>
                    <div className="inputItem ppt" >
                    Powerpoint To Pdf
                        <input type="file" onChange={(event) => handleChange(event)} 
                        accept="application/vnd.ms-powerpoint, .ppt, .pptx"/>
                    </div>
                </div>
            </div>
           {isLoading && <div className="loading" >
            Server Processing File...
            </div>}
        </div>
    )
}
export default Main