import { Component } from '@angular/core';

@Component({
  selector: 'ngx-app-date-picker',
  template: `
    <input type="datetime-local" [(ngModel)]="pullOver" (ngModelChange)="onDateChange($event)" />
<!--    <p>{{ formattedPullOver }}</p>-->
  `,
})
export class DatePickerComponent {
  pullOver: string | undefined;
  formattedPullOver: string | undefined;

  onDateChange(event: string) {
    this.pullOver = event;
    // Formata a data no formato desejado
    this.formattedPullOver = this.formatDate(event);
    console.info('Data formatada: ', this.formattedPullOver);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC',
    };

    // Usa toLocaleString para formatar a data
    const formattedDate = date.toLocaleString('pt-BR', options);

    // Substitui os caracteres conforme necessário
    return formattedDate.replace(/\//g, '-').replace(' ', 'T');
  }

}
