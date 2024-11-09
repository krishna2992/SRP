import React from "react";
import './Test2.css'
import html2canvas from 'html2canvas';
import  {jsPDF } from "jspdf";
import {pdf, PDFViewer} from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const Test2 = () =>{

    const onClick = () =>{
        const input = document.getElementById('divToPrint');
        html2canvas(input).then((canvas) =>{
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            pdf.save("download.pdf");
        })


    }

    return (
        <div className="main-pdf-download-div">
            <div className="mb5">
                <button  onClick={onClick}>Download</button>
            </div>
            <div  id="divToPrint" className="divTodownload" >
                <div className="pdf-header">
                  <div style={{textAlign:'center'}}>
                  <h2>INDIAN INSTITUTE OF INFORMATION TECHNOLOGY GUWAHATI</h2>
                  <h3>Bachelor of Technology Grade Card (Semester I to VII) </h3>
                  </div>
                  <div style={{display:'flex', justifyContent:'space-evenly'}}>
                    <div>
                      <p>Program Duration: 4 Years </p>
                      <p>Semesters: Eight (8)</p>
                      <p>Name: SURYAWANSHI KRISHNA BALAJIRAO</p>
                    </div>
                    <div>
                      <p>Roll No.: 2001196</p>
                      <p>Year of Enrolment: 2020</p>
                      <p>Discipline: Computer Science and Engineering</p>
                    </div>
                  </div>
                  <div style={{display:'flex', justifyContent:'space-evenly'}}>
                    <table>
                      <tbody>
                        
                      </tbody>
                    </table>
                  </div>
                </div> 
            </div>
        </div>
    )
}



const styles = StyleSheet.create({
    page: {
    //   flexDirection: 'column',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    header_div:{
        fontSize:"17px",
        fontFamily: 'Courier-Bold',
        // Courier-Bold
    }
  });

const MyDocument = () => (
    <Document >
      <Page  size="A4" style={{backgroundColor:'white', margin:'15px'}}>
        <View>
            <View style={{textAlign:'center', marginRight:'27px', marginBottom:'10px'}}>
                <Text style={styles.header_div}>INDIAN INSTITUTE OF INFORMATION TECHNOLOGY GUWAHATI</Text>
                <Text style={{fontSize:'13px', fontWeight: 1000, fontFamily:'Helvetica-Bold'}}>Bachelor of Technology Grade Card (Semester I to VII) </Text>
            </View>
            <View style={{display:'flex',flexDirection:'row', justifyContent:"space-around",fontFamily:'Helvetica-Bold'}}>
                <View style={{fontSize:'10px', fontWeight:'bolder', lineHeight:'1.5px'}}>
                    <Text style={{fontWeight:'extrabold'}}>Program Duration: 4 Years </Text>
                    <Text>Name: SURYAWANSHI KRISHNA BALAJIRAO </Text>
                    <Text>Discipline: Computer Science and Engineering</Text>
                </View>
                <View style={{fontSize:'10px', lineHeight:'1.5px'}}>
                    <Text>Semesters: Eight (8)</Text>
                    <Text>Roll No.: 2001196</Text>
                    <Text>Year of Enrolment: 2020</Text>
                </View>
                
            </View>
        </View>
        <View>
          <View  style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', borderBottom:'1px solid black', borderTop:'1px solid black'}}>
                  <View style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                    <View><Text>A</Text></View>
                    <View><Text>A</Text></View>
                    <View><Text>A</Text></View>
                  </View>
                  <View>
                    <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <View><Text>A</Text></View>
                      <View><Text>A</Text></View>
                      <View><Text>A</Text></View>
                    </View>
                  </View>
          </View>
        </View>
        
      </Page>
    </Document>
  );

const Test3 = () =>{
    const downloadButtonClick = async () =>{
        const filename = 'test.pdf';
        const blob = await pdf(<MyDocument/>).toBlob();
        console.log(blob);
        saveAs(blob, filename);
    }
    const { innerWidth: width, innerHeight: height } = window;
    console.log(width, height)
    return (
        <div>
            <button onClick={downloadButtonClick}>Download Sample</button>
            <PDFViewer style={{height:`${height}px`, width:`${width}px`}}>
                <MyDocument/>
            </PDFViewer>
        </div>
    )
}

export default Test3;