# MetaU Hub (MU Intern Capstone Project: Rafael Collado)

## Table of Contents
1. [Overview](#Overview)
2. [Product Spec](#Product-Spec)
3. [Wireframes](#Wireframes)
4. [Schema](#Schema)

## Overview
### Summary

MetaU Hub is a centralized web hub/tool for MetaU interns and those involved behind the scenes at MetaU to have an interface specifically addressing their particular needs.

### Description

The MetaU Hub is a centralized web hub/tool intended for MetaU interns and those involved behind the scenes of the program. The project has two main goals in mind: 1) provide easy access to various pieces of important information, such as MetaU-related information, documents, and announcements, and 2) facilitate connection between different people involved with the program such as MetaU interns, CodePath instructors, MetaU program managers, etc.

In the spirit of long-term impact, I want to create something that could benefit the experience of fellow MetaU interns and full-time employees involved with MetaU long into the future. It is the program’s 10th year anniversary, but it is only the first year that web development is offered as a track, so with this in mind, I want to take advantage of the newly available development platform in a meaningful way in order to give back to the MetaU program.

### Demo
https://www.youtube.com/watch?v=Gsa_ymRUSkE

### Timeline
https://docs.google.com/document/d/1LEndSmMHgrxabNb-HG5G64Zwi7PrFSU8b8BCrriioQ8/edit?usp=sharing (only accessible by Meta-affiliated workers)

## Product Spec
### 1. User Stories

**MetaU Intern - Alex**

Alex is a new MetaU intern, excited to jump in to their first ever internship experience. Never having completed another project-based internship, Alex is 
immediately overwhelmed with the amount of information given to them over the course of the first week. They find that their commitments, which may include 
balancing the coding bootcamp, communicating between several points of contact, and participating in team-related/intern activities is difficult on top of 
adjusting to a new environment.

With the MetaU Hub, Alex finds several documents and links such as their internship timeline, communication expectations, bootcamp schedule, project 
expectations, and other important information are easily accessible through a centralized webpage. They also find that they are able to upload their own 
documents and information such as their project plan and weekly updates to share with their intern manager. Alex finds that the MetaU Hub is a useful one-
stop shop for receiving and keeping track of internship information they need and is relieved of much of their initial stress.

**MetaU Intern - Blair**

Blair is a MetaU intern who is looking for fellow MetaU interns to connect with. They meet a cool intern named Dana in their bootcamp cohort, but outside 
of class, they try to search Dana on Workplace Chat but cannot find them because they are not on the same team and Dana does not appear in their search 
(there’s just too many other people named Dana at Meta!). Blair also finds that, as a reserved person in general, it is hard to connect with MetaU interns 
at and away from work.

On accessing the MetaU Hub, Blair is able to find all of their MetaU intern peers, including Dana. Blair is able to open a Workplace chat with Dana by 
clicking on their profile. Blair is also able to fill out a MetaU intern profile including a biography section so that interns can get to know them a 
little better. They are able to find other MetaU interns that have similar interests/backgrounds/teams/residence area and begin communicating and meeting 
with them during and after work. Blair is fulfilled by finding a group of friends through the MetaU Hub.

**MetaU Program Manager - Chris**

Chris is a MetaU program manager whose job is to make sure MetaU interns are aware of specific MetaU intern events and announcements. They find that 
posting on Workplace is able to get the word out, but not all interns are aware of when events are scheduled for and whether they are mandatory or not.

On the MetaU Hub, as a program manager, Chris is allowed to post announcements to a feed that is visible to all MetaU interns. They are able to share 
updates and events via the MetaU Hub, and can also select what types/groups of interns can see relevant announcements such as iOS/Android/Web interns or 
interns who have a specific start date.

### 2. Navigation
The "/" endpoint renders many different screens depending on user account status (whether they have logged in, have an account, etc.)
Access to any other URL extenders is blocked unless a user has completed the registration and login process.
Once the user is logged in, the "/" endpoint leads to many others:
- "/account_update"
- "create_announcement"
- "/intern_discover"
- "document_upload"
- "/blog"

All of these endpoints lead back to the "/" endpoint via the interactive icon in the top navbar.
There are also several links in the sidebar that redirect to external websites via a new tab.

## Wireframe / Mockup
https://www.figma.com/file/BAGCoZNmJsYFgIOoEHr6Re/MetaU-Hub?node-id=0%3A1 (only accessible by Meta-affiliated workers)

Screenshot of homepage mockup:

<img width="1101" alt="Screen Shot 2022-08-18 at 3 02 52 PM" src="https://user-images.githubusercontent.com/73001297/185503075-7ff39f61-a5e9-4a41-b477-1015101bf8a0.png">

## Schema 
### Models
https://docs.google.com/document/d/1QUS4lxpS3XeEsrxDcK5iAa260tMpQZf7rf0NNoMrSdk/edit?usp=sharing (only accessible by Meta-affiliated workers)


### Networking
#### API Endpoints
https://docs.google.com/document/d/1uVdazqsPYhYmoJWNb3fGxCY-JsIVDMsL_5m-WkKuV18/edit?usp=sharing (only accessible by Meta-affiliated workers)


#### List of network requests by screen

- "/": POST /user (create account), GET /user, POST /intern (create intern account), GET /announcements (home)
- "/account_update": PUT /intern, DELETE /user
- "create_announcement": POST /announcements
- "/intern_discover": GET /interns
- "document_upload": POST /file, GET /file
- "/blog": N/A (blog posts retrieved from blogs.JSON file in src)
