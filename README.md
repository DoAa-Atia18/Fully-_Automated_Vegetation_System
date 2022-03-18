# Automated-Vegetation-System
![Hydroponic System](https://image.freepik.com/free-vector/hydroponic-farm-man-harvesting-organic-vegetable-from-hydrophonic-green-house-concept-cartoon-illustration_201904-462.jpg)
***
## Description
 This is a web application that aims to provide assistive information through visual representations (graphs) and verbal messages (notification) to help in decision making and monitoring of the plant condition, it is connected to an embedded system providing readings like temperature, and uploads images that get processed by a deep learning algorithm on a separate server to know the state of the plant.
## Features

### Home Page
The home page contains the latest readings from each sensor, providing a quick preview of the status of the plant.
![Home Page1](https://media.milanote.com/p/images/1M75BJ1mjuVZ7K/7pn/home+page.png)
***
### Stats Page
You can now navigate to statistics page and get data from 3 tables (temperature, PH, electric conductivity) 
You can do the following:

1. Get previous/next pages in each graph (you can choose a graph from the 3 icons at the bottom of the graph, temperature graph is chosen by default), when no pages are available the chevron will disappear.

![Statistics Page](https://media.milanote.com/p/images/1M4Wkf19bgf5dA/Fqp/ezgif.com-gif-maker%20%284%29.gif)

![Statistics Page1](https://media.milanote.com/p/images/1M75BJ1mjuVZ7J/sgY/stats+page.png)

1. You can specify a filter on the minimum value and the max value , the beginning date and the last date as well as the limit of points of each graph, on submitting you will get the result displayed on the corresponding graph , if the filtered result is  greater than the limit you specified you can simply use the next/previous buttons to navigate through the result.

2. If no filter is specified, the default value will be used.
3. You can use the reset button to reset the form data to the default.

***
### Notification page
Any reading from the MC are checked if they are within desired levels, otherwise, they will be stored as notification for the user.
You can do the following:

1. Check if new notification are present notifications include useful information like the measured value, its deviation from norm, its date, if it's below or above average and which table it comes from , if none are present, a notification message will be displayed indicating no notifications are present.
2. You can mark notifications as read by clicking any of the notification's edges, the notification color will change accordingly, any read notifications will not be shown again.
3. You can dismiss any notification which will delete the notification and mark it as read; so it won't show again. 
4. When no notification is present; a default message will inform that everything is ok.
![Notification Page](https://media.milanote.com/p/images/1M4WqL19bgf5dD/F7k/ezgif.com-gif-maker+%285%29.gif)
![Notification Page](https://media.milanote.com/p/images/1M75BJ1mjuVZ7I/obm/notification+page.png)

***

### Upload Page
The user can upload an image and if it's of a valid format and size (PNG/JPEG max 5MB) then the image will be compressed to 224*224 pixels and converted to JPEG to be suitable for the python server to handle it, the image is then sent to the python server to processed.
![Upload Page](https://media.milanote.com/p/images/1M75BJ1mjuVZ7L/86b/upload+page.png)

***

### Result Page
Here the user is redirected to the python server and can view the latest processed images from the deep learning algorithm giving important information about the plant and if it's infected or not.

## Tools
This is a web application using :
   1. HTML to define the content of web pages (later used a templating engine (EJS).
   2. CSS to specify the layout of web pages.
   3. JavaScript to program the behavior of web pages.
   4. Node JS and Express for backend development (server initialization, routing and serving of web content).
   5. MongoDB for database storage.
   6. Mongoose for object modeling of the database (definition of schemas for each table in the database).
   7. Replit/VS-Code as an IDE and the current server hosting.
   8. GitHub for version control.
***
## Diagrams

### Use Case

![Use Case](https://lucid.app/publicSegments/view/6c1ed04e-a8fa-41bc-b79b-c379b806ce8c/image.png)

***
### Stats Page Flow Diagram
![Stats Page Sequence Diagram](https://lucid.app/publicSegments/view/c32db136-00b7-4e99-9f3d-b96f04df8a76/image.png)

***
### Notification Page Sequence Diagram
![Notification Page Sequence Diagram](https://lucid.app/publicSegments/view/f66941cc-f6d3-43bd-884d-17ce6a03e953/image.png)

***

### Upload Page Sequence Diagram
![Upload Page Sequence Diagram](https://lucid.app/publicSegments/view/d3b6df5a-0599-4e32-9b06-1f021910ba7e/image.png)

***

## Old Site vs New Site
![Old site vs New Site](https://media.milanote.com/p/images/1M5wnC19blWe7Q/nIE/BeFunky-collage+%281%29.jpg)
![Old Site vs New Site](https://media.milanote.com/p/images/1M5wsr19blWe7R/tbt/BeFunky-collage%20%282%29.jpg)

## Project Steps
### Finished Project Steps
1. Boiler Plate for Project
2. Statistics Page
3. Navigation Menu
4. Navigation Routing
5. Graph for each measured unit
6. Make dummy data
7. Store data in database
8. Plot graphs
9. Notification Page
10. Use Case Diagram
11. Sequence Diagram Notification Page
12. Sequence Diagram Statistics Page
13. Make a diagram of the project
14. Add notification counter
15. Current status for each table in home page
16. Receive data from embedded app
17. Page to upload images
18. Saving images locally/DB
19. Diagram for upload page
20. Diagram for view page
    
## Link for Site
https://automated-vegetation-system.piemaker1.repl.co/

## QR Code for Site
![QR Code for Site](https://media.milanote.com/p/images/1M5zUZ19blWe7T/lwO/qrcode_automated-vegetation-system.piemaker1.repl.co+%281%29.png)

