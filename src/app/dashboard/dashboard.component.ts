import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selectedCountryCode: string | null = null;
  filteredData: any[] = [];

  constructor() {}

  ngOnInit(): void {

    // this.filterData('AU');
    // this.filterData('GB');
    // this.filterData('US');
  }

  input = [
    { id: 611, countryCode: "AU", venue: "Pinjarra", date: "1692591360" },
    { id: 612, countryCode: "AU", venue: "Pinjarra", date: "1692604800" },
    { id: 613, countryCode: "GB", venue: "Redcliffe", date: "1692625100" },
    { id: 614, countryCode: "GB", venue: "Brighton", date: "1692623100" },
    { id: 615, countryCode: "US", venue: "Lingfield", date: "1692634200" },
    { id: 616, countryCode: "RA", venue: "Philadelphia", date: "1692636000" },
    { id: 617, countryCode: "GB", venue: "Landgrob", date: "1692626000" },
    { id: 618, countryCode: "GB", venue: "Redcliffe", date: "1692625100" },

  ];

  filterData(countryCode: string) {
    this.selectedCountryCode = countryCode;

    const groupedData: any[] = [];
    const venueData: { [key: string]: boolean } = {};

    this.input.forEach(item => {
      if (item.countryCode === countryCode) {
        const venueKey = item.venue;

        if (!venueData[venueKey]) {
          venueData[venueKey] = true;
          groupedData.push({
            id: item.id,
            countryCode: item.countryCode,
            venue: item.venue,
            data: [
              {
                id: item.id,
                countryCode: item.countryCode,
                venue: item.venue,
                date: this.getTime(item.date)
              }
            ]
          });
        } else {

          const existing = groupedData.find(d => d.venue === item.venue);
          if (existing) {
            existing.data.push({
              id: item.id,
              countryCode: item.countryCode,
              venue: item.venue,
              date: this.getTime(item.date)
            });
          }
        }
      }
    });

    this.filteredData = groupedData;
  }

  getTime(unixTiming: string) {
    return new Date(parseInt(unixTiming) * 1000)
      .toISOString()
      .substr(11, 5);
  }
}
