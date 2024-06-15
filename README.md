# MahiTime and MahiCalendar

This project provides a website that displays the concept of MahiTime and the MahiCalendar, offering a new way to measure and visualize time.

You can read the full blog here: [MahiTime](https://mahi97.github.io/mahi-log/2024/06/08/mahitime.html)

## Features

- Explanation of MahiTime units:
  - **MahiSecond:** 0.432 seconds
  - **MahiMinute:** 100 MahiSeconds (~43.2 seconds)
  - **MahiHour:** 100 MahiMinutes (~72 minutes)
  - **Day:** 20 MahiHours
  - **MahiDay:** 20.0381628 MahiHours
  - **MahiYear:** 366 MahiDays (exactly one tropical year, no leap years)
- Explanation of MahiCalendar structure:
  - **Seasons:**
    - Spring: 93 MahiDays
    - Summer: 93 MahiDays
    - Autumn: 90 MahiDays
    - Winter: 90 MahiDays
  - **Months:**
    - Spring/Summer: 31 MahiDays
    - Autumn/Winter: 30 MahiDays
- Current MahiTime display that updates dynamically

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mahitime-website.git
   cd mahitime-website
