import { Component, OnInit } from '@angular/core';
import { Babysitting } from 'src/app/model/Babysitting';
import { BabysittingService } from 'src/app/service/babysitting.service';
import { AuthService } from 'src/app/service/auth.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ViewChild, ElementRef } from '@angular/core';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-parent-contract-list',
  templateUrl: './parent-contract-list.component.html',
  styleUrls: ['./parent-contract-list.component.css']
})
export class ParentContractListComponent implements OnInit {

  //contracts: Babysitting[] = [];
  contracts: (Babysitting & { review?: any })[] = [];

  userId: number = 2; // 🔁 à remplacer plus tard par AuthService

  constructor(public babysittingService: BabysittingService, private authService: AuthService) {}

  // ngOnInit(): void {
  //   const currentUser = this.authService.getCurrentUser();
  //   this.userId = 2;
  
  //   this.babysittingService.getContractsByParent(this.userId).subscribe({
  //     next: (data) => {
  //       this.contracts = data;
  //       console.log("📦 Contracts loaded:", this.contracts);

  //     },
  //     error: err => {
  //       console.error("❌ Error loading contracts:", err);
  //     }
  //   });
  // }


   //opt1:
   ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    this.userId = 2; // Remplace plus tard par currentUser.id si nécessaire
  
    this.babysittingService.getContractsByParent(this.userId).subscribe({
      next: (data) => {
        this.contracts = data;
        console.log("📦 Contracts loaded:", this.contracts);
  
        // 🔄 Pour chaque contrat, on récupère les reviews (si id présent)
        this.contracts.forEach(contract => {
          if (contract.idBabysitting !== undefined) {
            this.babysittingService.getReviewsByBabysittingId(contract.idBabysitting).subscribe(reviews => {
              contract.review = reviews.length > 0 ? reviews[0] : null; // Ajoute dynamiquement la review au contrat
            });
          }
        });
      },
      error: err => {
        console.error("❌ Error loading contracts:", err);
      }
    });
  }
  
  

  // @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  // downloadPdf(): void {
  //   setTimeout(() => {
  //     const element = this.pdfContent?.nativeElement;
  
  //     if (!element) {
  //       console.error('pdfContent element is not available.');
  //       return;
  //     }
  
  //     html2canvas(element, { scale: 2 }).then(canvas => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4');
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
  //       // Logo
  //       const logo = new Image();
  //       logo.src = 'assets/logo-bambino.png';
  //       logo.onload = () => {
  //         pdf.addImage(logo, 'PNG', 10, 10, 40, 15);
  //         pdf.addImage(imgData, 'PNG', 10, 30, pdfWidth - 20, pdfHeight);
  //         pdf.save('Bambino_Contracts.pdf');
  //       };
  //     });
  //   }, 100); // attendre 100ms
  // }
  downloadPdf(): void {
    const element = document.getElementById('pdfContent');
  
    if (!element) {
      console.error('❌ pdfContent element is not available.');
      return;
    }
  
    html2canvas(element, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      const logo = new Image();
      logo.src = 'assets/img/Bambino.png'; // adapte selon ton chemin réel
      logo.onload = () => {
        pdf.addImage(logo, 'PNG', 10, 10, 40, 15);
        pdf.addImage(imgData, 'PNG', 10, 30, pdfWidth - 20, pdfHeight);
        pdf.save('Bambino_Contracts.pdf');
      };
    });
  }

  // generatePdfFromContract(contract: any): void {
  //   const element = document.getElementById('pdf-content-' + contract.idBabysitting);
  //   if (element) {
  //     const opt = {
  //       margin:       0.3,
  //       filename:     `babysitting-summary-${contract.idBabysitting}.pdf`,
  //       image:        { type: 'jpeg', quality: 0.98 },
  //       html2canvas:  { scale: 2 },
  //       jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
  //     };
  //     html2pdf().set(opt).from(element).save();
  //   } else {
  //     console.error("❌ pdf-content element not found for contract:", contract.idBabysitting);
  //   }
  // }
  // downloadContractPdf(id: number): void {
  //   const url = `http://localhost:8089/babysitting/pdf/${id}`;
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = `babysitting-contract-${id}.pdf`;
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  // }
  
  // generatePdfFromContract(contract: any): void {
  //   const elementId = 'pdf-content-' + contract.idBabysitting;
  //   const element = document.getElementById(elementId);
  
  //   if (!element) {
  //     console.error(`❌ Element with id '${elementId}' not found.`);
  //     return;
  //   }
  
  //   // ✅ Attendre 500ms pour laisser le DOM charger la review
  //   setTimeout(() => {
  //     const opt = {
  //       margin: 0.3,
  //       filename: `babysitting-summary-${contract.idBabysitting}.pdf`,
  //       image: { type: 'jpeg', quality: 0.98 },
  //       html2canvas: { scale: 2 },
  //       jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  //     };
  
  //     html2pdf().set(opt).from(element).save();
  //   }, 500);
  // }
  generatePdfFromContract(contract: any) {
    const element = document.getElementById('pdf-content-' + contract.idBabysitting);
    if (element) {
      element.style.visibility = 'visible';
      element.style.position = 'relative';
      element.style.left = '0';
  
      setTimeout(() => {
        const opt = {
          margin: 0.3,
          filename: `babysitting-summary-${contract.idBabysitting}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save().then(() => {
          // Remettre invisible après capture
          element.style.visibility = 'hidden';
          element.style.position = 'absolute';
          element.style.left = '-9999px';
        });
      }, 100);
    }
  }
  


  
  
}

