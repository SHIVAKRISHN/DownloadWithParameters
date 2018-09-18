/**
 * 
 */
package com.shiva.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.LineSeparator;

/**
 * @author shiva
 *
 */

@RestController
@RequestMapping("/download")
@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
public class DownloadController {

	private static final String TITLE = "TestReport";
    public static final String PDF_EXTENSION = ".pdf";
	
	@GetMapping("/methodOne")
	public ResponseEntity < InputStreamResource > exportPDF() throws FileNotFoundException,DocumentException
	{Document document = new Document(PageSize.A4, 36, 36, 90, 36);
	String filePath = "ApplicantDetails.pdf";

	PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(filePath));

	// add header and footer
	//HeaderFooterPageEvent event = new HeaderFooterPageEvent("HostelLogo.png","hostelStudentObj.getHostelName()","hostelAddress");
	//writer.setPageEvent(event);

	document.open();

	try {
		//  PdfPTable table = new PdfPTable(new float[] { 2, 5, 5, 4, 5, 6, 8, 8, 8, 6 });
		PdfPTable table = new PdfPTable(9);
		table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);

		// List<Student> studentList =new ArrayList<Student>();
			document.addTitle("Shiv's file ");
			
			document.add(new Paragraph(""));
			
			//document.add(new Paragraph("Student No.  :									"+stuObj.getStudentId()+"    					        				                			        Email/Login ID :				"+stuObj.getStudentEmail()));
			
			//document.add(new Paragraph("Student Name :						"+stuObj.getFullName()+"            					        Handphone No :				"+stuObj.getStudentContactnNo()));
		
			document.add(new Paragraph("			"));
			
		    LineSeparator line = new LineSeparator();
		    line.setOffset(-2);
		    document.add(line);
		    
		    document.add(new Paragraph("Name "+"					"+"MobileNumber"+"										"+"Age"+"																																	"+"Gender"));
			
		    document.add(new Paragraph("		"));
			
		    LineSeparator line1 = new LineSeparator();
		    line1.setOffset(-2);
		    document.add(line1);
		    
		   // document.add(new Paragraph(hostelStudentObj.getCreatedTime().split(" ")[0]+"					"+" "+"										"+"HostelFees__"+hostelStudentObj.getHostelFeesStructure()+"																"+hostelStudentObj.getTotalAmount()+"										"+" "));
		    String dispString="";
		    float paidfee=0;
		    	
		    
		    
		    document.add(new Paragraph("		"));
			
		    LineSeparator line2 = new LineSeparator();
		    line2.setOffset(-2);
		    document.add(line2);
		    
		    
		    //document.add(new Paragraph("																																																																														Total											"+hostelStudentObj.getTotalAmount()+"																								"+paidfee+""));
		    
			//document.add(new Paragraph("No results found."));

		document.close();
		writer.close();
	} catch(DocumentException e) {
		e.printStackTrace();
	}

	File file = new File(filePath);
	InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

	return ResponseEntity.ok().header("attachment;filename=" + "ApplicantDetails.pdf").contentType(MediaType.APPLICATION_PDF).contentLength(file.length()).body(resource);

	}
	
}
