# PRD: Cars24 Onsite Assistant — MVP

## 1. Objective

Build an **onsite chat-led experience inside the Cars24 app** that helps walk-in customers explore cars at a Cars24 hub with minimal dependency on sales/operations staff.

The MVP will use only capabilities we already assume exist:

* OCR number plate scanner
* GPS tracker/location for cars
* Existing test-drive booking backend
* Staff-assisted key handoff
* 4-digit PIN verification to start and end test drives

The goal is to reduce staff involvement during the **exploration, car discovery, comparison, and test-drive initiation phase**, while still keeping staff control for key handoff and key return.

---

## 2. Product positioning

### Feature name

**Cars24 Onsite Assistant**

### User-facing promise

> Explore cars at the hub without waiting for a salesperson.

### Internal product promise

> Reduce operational dependency in hub exploration and test-drive handling while maintaining security through PIN-based staff verification.

---

## 3. MVP scope

### In scope

1. Chat-led onsite experience.
2. User intent capture:

   * brand preference,
   * budget,
   * body type,
   * fuel type,
   * transmission,
   * usage need.
3. Top 4 car recommendations available at the hub.
4. Metrics/social proof to support decision-making:

   * most test-driven cars,
   * popular brands in the selected budget,
   * cars getting high interest at the hub.
5. OCR-based number plate scan to fetch car details.
6. GPS-based car location with Google Maps/deep-link support.
7. Existing test-drive booking flow.
8. One active test drive at a time.
9. 4-digit PIN to start test drive.
10. 4-digit PIN to end test drive after key return.
11. Backend tracking of cars test-driven during a single visit.
12. Minimal staff intervention only for:

* key handoff,
* key return,
* exception handling.

---

## 4. Out of scope for MVP

The MVP will **not** include:

* smart key lockers,
* indoor parking grid,
* floor/zone/bay mapping,
* UWB/BLE/RFID tracking,
* AR navigation,
* fully unattended test drives,
* automated physical key release,
* new booking backend,
* AI-led price negotiation,
* multi-floor indoor navigation.

For MVP, the assumption is that GPS location is good enough to help the user reach the general car location.

---

# 5. User personas

## 5.1 Walk-in explorer

A user enters a Cars24 hub without a specific car in mind.

They need help with:

* finding cars within budget,
* understanding options,
* comparing cars,
* locating cars,
* booking test drives.

## 5.2 Shortlisted buyer

A user has already seen a few cars online and comes to the hub to check them physically.

They need help with:

* locating shortlisted cars,
* scanning cars,
* checking details,
* booking test drive.

## 5.3 Existing booking user

A user has already booked a test drive before reaching the hub.

They need help with:

* locating the car,
* viewing car details,
* getting the 4-digit PIN,
* starting the test drive,
* ending the test drive.

## 5.4 Operations staff

Hub staff member responsible for:

* validating the 4-digit PIN,
* handing over keys,
* receiving keys back,
* entering the end PIN,
* handling exceptions.

---

# 6. Core user journey

## Journey A: User enters hub and starts discovery

### Step 1: Onsite Assistant opens

When the user is at the Cars24 hub, the app shows:

> Welcome to Cars24 Onsite Assistant.
> What kind of car are you looking for today?

Quick options:

* Under ₹5 lakh
* ₹5–8 lakh
* ₹8–12 lakh
* Automatic
* SUV
* Hatchback
* Sedan
* Family car
* Low maintenance
* Best mileage
* Already booked a car
* Scan a car

---

## Step 2: Assistant captures intent

The assistant asks lightweight questions:

1. What is your budget?
2. Any preferred company?
3. What body type are you looking for?
4. Manual or automatic?
5. Primary use case?

Example:

> I am looking for an automatic hatchback under ₹8 lakh for city driving.

The system converts this into structured filters:

```text
Budget: <= ₹8 lakh
Transmission: Automatic
Body type: Hatchback
Use case: City commute
Hub: Current hub
```

---

## Step 3: Assistant recommends top 4 cars

The assistant shows 4 cars currently available at the hub.

Each car card includes:

* image,
* model,
* variant,
* price,
* EMI estimate,
* kilometres driven,
* ownership,
* fuel,
* transmission,
* inspection confidence,
* popularity metric,
* test-drive availability,
* CTA buttons.

Example:

### Hyundai i20 Sportz Automatic

₹7.35 lakh
Petrol · Automatic · 34,000 km · 1st owner

Badges:

* Best match for city driving
* Most test-driven automatic in this hub this week
* Available for test drive

Actions:

* View details
* Locate car
* Compare
* Book test drive

---

# 7. Recommendation logic

The top 4 recommendation logic should consider:

| Factor               | Description                                              |
| -------------------- | -------------------------------------------------------- |
| User fit             | Budget, brand, body type, transmission, fuel, usage need |
| Hub availability     | Car is available at the current hub                      |
| Test-drive readiness | Car can be test-driven now or soon                       |
| Condition            | Inspection quality, ownership, kilometres                |
| Popularity           | Test drives, shortlists, interest at this hub            |
| Value                | Price compared to similar cars                           |

The assistant should not recommend cars that are unavailable, sold, blocked, or not test-drive ready.

---

# 8. Metrics and social proof

The assistant can show decision-support metrics inside the chat.

Examples:

### Hub-level metrics

> In this hub, Hyundai and Maruti are the most sold brands under ₹8 lakh.

### Budget-level metrics

> Under ₹8 lakh, automatic hatchbacks are the most test-driven segment here.

### Car-level metrics

> This car has been test-driven 9 times in the last 14 days.

### Brand-level metrics

> Hyundai is one of the most preferred brands in your selected budget range at this outlet.

### Similar car metric

> Cars similar to this usually receive high interest from city-commute buyers.

Important rule:

Metrics should support the decision, not pressure the user.

Avoid aggressive urgency like:

> 5 people are looking at this car right now. Book immediately.

Use neutral language:

> This car is getting high interest at this hub.

---

# 9. Independent actions inside the chat

The chat window should support multiple independent actions.

## 9.1 Search cars

User can say:

> Show me automatic cars under ₹8 lakh.

System returns top 4 matching cars.

---

## 9.2 View metrics

User can ask:

> What are people buying here?

System returns:

* most sold brands in this hub,
* most test-driven cars,
* popular body type in selected budget,
* popular transmission type,
* fast-moving cars.

---

## 9.3 Locate car

User taps:

> Locate car

System fetches the car’s GPS location and opens a Google Maps link.

Assistant message:

> I’ll take you near this car’s current location. Once you reach there, scan the number plate to confirm it is the right car.

Actions:

* Open Google Maps
* Scan car
* View details

---

## 9.4 Scan car

User taps:

> Scan car

The OCR scanner reads the number plate and fetches the matching Cars24 inventory record.

The assistant shows:

* car details,
* price,
* EMI,
* inspection summary,
* test-drive availability,
* comparison options.

If OCR fails:

* retry scan,
* enter registration number manually,
* search by model.

---

## 9.5 Existing booking

User taps:

> I already booked a car

System shows:

* booked car,
* booking time,
* current test-drive status,
* car location,
* start PIN status.

Actions:

* Locate car
* View car details
* Start test drive
* Cancel/reschedule

---

## 9.6 Book test drive

User taps:

> Book test drive

System checks:

* car availability,
* user eligibility,
* no active ongoing test drive,
* booking slot availability,
* car test-drive readiness.

If all checks pass, the system creates a test-drive booking and generates a 4-digit start PIN.

---

# 10. Test-drive flow

## 10.1 Booking creation

When the user books a test drive:

System creates:

```text
Booking ID
User ID
Car ID
Hub ID
Start PIN
Booking timestamp
Booking status: Booked
```

User sees:

> Your test drive is booked.
> Please show this 4-digit PIN to the staff to collect the key.

Example:

> Start PIN: 4821

---

## 10.2 Key handoff

The staff member verifies the PIN in the staff system.

Staff flow:

1. User shows 4-digit PIN.
2. Staff enters PIN.
3. Backend validates:

   * booking exists,
   * PIN is valid,
   * car matches booking,
   * user has no active test drive,
   * key is available.
4. Staff hands over the key.
5. System marks test drive as started.

Status changes:

```text
Booked → Key handed over → Test drive started
```

User sees:

> Test drive started. Please return the key after your drive.

---

## 10.3 One active test drive rule

A user cannot book or start another test drive if any of these statuses are active:

* Booked
* Key handed over
* Test drive started
* Awaiting key return

If the user tries to book another test drive, the assistant says:

> You already have an active test drive. Please return the key and end the current test drive before booking another car.

---

## 10.4 Test drive completion

After the test drive, the user returns to the staff/key desk.

User taps:

> End test drive

System generates or displays a 4-digit end PIN.

Example:

> End PIN: 7394

Staff flow:

1. User returns key.
2. User shows end PIN.
3. Staff enters end PIN.
4. Backend validates active test-drive session.
5. Staff confirms key received.
6. System marks test drive as completed.

Status changes:

```text
Test drive started → Key returned → Test drive completed
```

User sees:

> Test drive completed. How was the drive?

---

## 10.5 Post-test-drive feedback

After test drive completion, assistant asks:

> How did you feel about this car?

Options:

* I liked it
* I want to compare
* Too expensive
* Did not like the drive
* Need automatic/manual alternative
* Want to check EMI
* Want to talk to advisor

Based on response, assistant recommends next action.

If user liked it:

* reserve car,
* check EMI,
* start purchase flow,
* talk to advisor.

If user did not like it:

* show alternatives,
* recommend another top 4 set,
* allow another test-drive booking.

---

# 11. Backend state model

## 11.1 Visit session

Every onsite user should have a visit session.

```text
Visit Session ID
User ID
Hub ID
Entry timestamp
Exit timestamp
Cars viewed
Cars scanned
Cars recommended
Cars test-driven
Active booking ID
Total test drives in visit
```

This helps Cars24 track:

* how many cars the user explored,
* how many were scanned,
* how many were test-driven,
* which car converted,
* how much staff dependency was reduced.

---

## 11.2 Test-drive statuses

Recommended status model:

| Status              | Meaning                                |
| ------------------- | -------------------------------------- |
| Recommended         | Car shown in top 4                     |
| Viewed              | User opened car details                |
| Located             | User tapped locate                     |
| Scanned             | User scanned number plate              |
| Booked              | Test drive booking created             |
| Start PIN generated | PIN available for key collection       |
| Key handed over     | Staff validated start PIN              |
| Test drive started  | Test drive is active                   |
| Awaiting key return | User expected to return key            |
| End PIN generated   | User initiated end test-drive flow     |
| Key returned        | Staff received key                     |
| Completed           | Test drive closed                      |
| Cancelled           | Booking cancelled                      |
| No-show             | User did not start within allowed time |
| Exception           | Staff intervention required            |

---

## 11.3 Car test-drive counter

Backend should track at least two levels:

### User visit level

```text
User X test drove 3 cars during Visit Session Y
```

### Car level

```text
Car A was test-driven 12 times in last 14 days
```

This supports both operations and social proof.

---

# 12. Functional requirements

## FR1: Onsite Assistant entry

The system should allow the user to access Onsite Assistant when they are at or near a Cars24 hub.

Entry options:

* app detects hub GPS/geofence,
* user manually selects hub,
* user scans hub QR code.

---

## FR2: Intent capture

The assistant should capture the user’s car preference through chat and quick chips.

Minimum filters:

* budget,
* brand/company,
* body type,
* fuel type,
* transmission,
* use case.

---

## FR3: Top 4 recommendations

The system should show the top 4 cars available at the selected/current hub based on user preferences.

Each recommendation should include:

* car image,
* price,
* key specs,
* EMI estimate,
* inspection confidence,
* availability,
* popularity metric,
* locate CTA,
* scan CTA,
* book test drive CTA.

---

## FR4: Hub metrics

The assistant should show relevant hub-level and budget-level metrics.

Examples:

* most test-driven car in selected budget,
* most sold brand in selected budget,
* popular body type,
* popular transmission,
* high-interest cars.

---

## FR5: GPS-based car location

The system should fetch the GPS location of the selected car.

The assistant should provide:

* Google Maps link,
* basic navigation CTA,
* message asking user to scan number plate after reaching the car.

---

## FR6: OCR number plate scan

The system should allow the user to scan a car number plate.

On successful OCR:

* match registration number with Cars24 inventory,
* fetch car details,
* show car profile in chat.

If multiple matches or low confidence:

* ask user to confirm,
* allow manual entry.

---

## FR7: Car profile in chat

After scan or recommendation selection, the chat should show:

* make/model/variant,
* price,
* EMI estimate,
* year,
* kilometres driven,
* ownership,
* fuel,
* transmission,
* inspection summary,
* test-drive availability,
* warranty/return highlights.

---

## FR8: Test-drive booking

The system should allow the user to book a test drive for a car if:

* the car is available,
* the car is test-drive ready,
* the user has no active test drive,
* booking backend confirms slot availability.

---

## FR9: Start PIN generation

After booking, the backend should generate a 4-digit start PIN.

The start PIN should be shown to the user and validated by staff before key handoff.

---

## FR10: Staff key handoff

Staff should validate the start PIN before giving the key.

Only after successful validation should the system mark the test drive as started.

---

## FR11: One active test drive restriction

The system should prevent the user from booking or starting another test drive until the current test drive is completed or cancelled.

---

## FR12: End PIN generation

When the user returns from the test drive, the system should generate/display a 4-digit end PIN.

Staff should validate the end PIN after receiving the key.

---

## FR13: Test-drive completion

Once staff validates the end PIN and confirms key return, the test-drive session should be marked completed.

The user should then be allowed to book another test drive.

---

## FR14: Visit-level tracking

The backend should track:

* number of cars recommended,
* number of cars viewed,
* number of cars located,
* number of cars scanned,
* number of cars test-driven,
* number of test drives completed,
* total time spent in visit.

---

# 13. Edge cases

## 13.1 OCR scan fails

System should allow:

* retry scan,
* manual registration number entry,
* search by model/variant.

---

## 13.2 GPS location is inaccurate

Assistant should say:

> I can take you near the car’s last known location. Please scan the number plate when you reach there to confirm.

---

## 13.3 Car has moved but GPS not refreshed

Assistant should show:

> This is the car’s last known location. If you cannot find it, request staff help.

Action:

* Request staff assistance.

---

## 13.4 User tries to book second test drive

Assistant should block:

> You already have an active test drive. Please end the current test drive before booking another car.

---

## 13.5 Start PIN expired

If the user does not collect the key within the allowed time:

> Your PIN has expired. Please regenerate the test-drive PIN or book again.

---

## 13.6 Staff enters wrong PIN

System should show:

> Invalid PIN. Please verify the user’s booking and try again.

After multiple failed attempts, require staff override.

---

## 13.7 User does not return key on time

System should trigger:

* user reminder,
* staff alert,
* escalation if delayed.

---

## 13.8 User returns key but end PIN not generated

Staff should have an exception flow:

* search active booking,
* verify user identity,
* mark key returned with reason,
* close test drive through supervisor override.

---

## 13.9 Car unavailable after recommendation

If a car becomes unavailable after recommendation:

> This car is no longer available for test drive. I can show similar options available now.

---

## 13.10 User scans a car not matching their filters

Assistant should still show details but provide context:

> This car is above your selected budget, but it is available for test drive. Would you like to compare it with cars under ₹8 lakh?

---

# 14. Analytics and success metrics

## North-star metric

> Self-serve test-drive conversion rate.

Formula:

```text
Users who booked test drive via Onsite Assistant / Users who started Onsite Assistant
```

---

## Funnel metrics

| Stage          | Metric                                    |
| -------------- | ----------------------------------------- |
| Entry          | Users opening Onsite Assistant at hub     |
| Discovery      | Users completing preference capture       |
| Recommendation | Users viewing top 4 recommendations       |
| Interest       | Users opening car details                 |
| Locate         | Users tapping locate car                  |
| Scan           | Users scanning number plate               |
| Booking        | Users booking test drive                  |
| Start          | Users starting test drive with PIN        |
| Completion     | Users ending test drive with PIN          |
| Repeat         | Avg cars test-driven per visit            |
| Conversion     | Test drive to purchase/reserve conversion |

---

## Operations metrics

| Metric                                         | Why it matters                          |
| ---------------------------------------------- | --------------------------------------- |
| Staff interactions per test drive              | Measures ops reduction                  |
| Time from recommendation to test-drive booking | Measures decision speed                 |
| Time from booking to key handoff               | Measures staff/key efficiency           |
| Invalid PIN attempts                           | Measures process friction/security      |
| Delayed key returns                            | Measures operational risk               |
| Cars test-driven per visit                     | Measures customer exploration depth     |
| Cars scanned per visit                         | Measures onsite engagement              |
| GPS locate success rate                        | Measures usefulness of location feature |
| Staff assistance requests                      | Measures where self-service fails       |

---

# 15. MVP success criteria

The MVP should be considered successful if:

1. Users can discover relevant cars without staff help.
2. Users can locate and scan cars independently.
3. Users can book test drives through the assistant.
4. Staff involvement is limited mainly to key handoff and return.
5. Test-drive start/end can be securely controlled using PINs.
6. Backend can track total cars test-driven in a visit.
7. Hub staff can see active test-drive status and key status.
8. Users can complete exploration and test drive with reduced waiting.

---

# 16. Final MVP flow summary

```text
User enters hub
↓
Opens Cars24 Onsite Assistant
↓
Assistant asks budget, brand, car type, use case
↓
Assistant recommends top 4 cars at the hub
↓
User views metrics and social proof
↓
User locates car using GPS / Google Maps
↓
User scans number plate using OCR
↓
Assistant fetches full car details
↓
User books test drive
↓
Backend generates 4-digit start PIN
↓
User shows PIN to staff
↓
Staff validates PIN and gives key
↓
Test drive starts
↓
User returns key
↓
Backend generates/displays end PIN
↓
Staff validates end PIN and confirms key return
↓
Test drive completed
↓
Backend updates visit-level test-drive count
↓
User can book another car or move to purchase flow
```

---

# 17. Final product definition

**Cars24 Onsite Assistant MVP** is a single chat-led experience inside the Cars24 app that helps hub visitors discover cars, get top recommendations, view popularity metrics, locate cars using GPS, scan number plates through OCR, and book test drives using the existing backend flow. Test drives are secured through staff-validated 4-digit PINs for key handoff and key return, reducing the need for sales or operations staff during the exploration and decision-making phase while preserving operational control.
