# Lost In Translation 🌐

### An AWS project by Daniel & Max demonstrating a hybrid cloud architecture for document translation.

## 🎯 Project Vision

**Lost In Translation** is a demonstration project designed to showcase a deep and practical understanding of Amazon Web Services. It illustrates a hybrid cloud architecture, blending traditional, server-based infrastructure with modern, serverless paradigms. The goal is to highlight our ability to design, implement, and manage a robust, scalable, and cost-efficient cloud solution.

The application allows a user to upload a document and receive translations in multiple languages simultaneously, showcasing a real-world use case for cloud services.

## ✨ Core Functionality

* **Frontend:** A clean, user-friendly interface built with **React**, served from a highly-available EC2 instance fleet.
* **Multi-Language Translation:** Upload a single document and select multiple target languages for translation.
* **Secure Downloads:** Translated documents are made available via secure, time-limited download links.
* **Scalable Backend:** The entire translation pipeline is powered by a serverless backend, ensuring it can handle fluctuating workloads efficiently.

## 🏗️ Architectural Deep Dive

We have intentionally designed a hybrid architecture to demonstrate expertise across different AWS service models. The frontend is hosted on **EC2 instances** behind an **Application Load Balancer (ALB)**, representing a more traditional, yet still widely used, deployment pattern. The backend, which handles the core business logic, is fully serverless, leveraging **API Gateway**, **Lambda**, **S3**, and **DynamoDB**.

This combination showcases our knowledge of both established and cutting-edge cloud architectures and our ability to integrate them seamlessly.

### 🌊 Data & Process Flow

The user journey and data flow are orchestrated through a series of decoupled services, ensuring resilience and scalability.

### **Flow Breakdown:**

1.  **Request Frontend:** The user navigates to our website. The request hits the **Application Load Balancer**, which distributes traffic across our **EC2 Auto Scaling Group** for high availability.
2.  **Upload Document:** The user selects a document and target languages in the React UI. The frontend makes a request to a private **API Gateway** endpoint.
3.  **Initial Handling (Lambda 1):** API Gateway triggers the `Upload Handler` Lambda. This function:
    * Creates a pre-signed URL so that the frontend can upload the files to S3 (initial-translation-files).
    * Creates a new entry in a **DynamoDB** table with a unique Job ID, the S3 location of the original file, and the translation status (e.g., `PENDING`).
4.  **Translation Processing (Lambda 2):** The `Translation Processor` Lambda is triggered by an event on the DynamoDB table (DynamoDB Streams). This decoupling ensures the upload process is fast and the user gets immediate feedback. This function:
    * Retrieves the document from the `originals` S3 bucket.
    * Calls the **AWS Translate** service for each selected language.
    * Saves each resulting translated document into a separate `translations` S3 bucket.
    * Updates the DynamoDB table entry for the job, marking the status as `COMPLETED` and adding the S3 locations of the translated files.
5.  **Retrieve Translations (Lambda 3):** The React frontend, which has been polling the job status via another API Gateway endpoint, sees the `COMPLETED` status. The user can now click "Download". This action calls the `Download Link Generator` Lambda, which:
    * Verifies the job status in DynamoDB.
    * Generates secure, pre-signed URLs for each of the translated files in the `translations` S3 bucket. These URLs grant temporary read access.
    * Returns the list of URLs to the frontend for the user to download their files.

## 🛠️ Technology Stack

### Frontend

* **React:** For building the dynamic user interface.
* **Axios:** For making API requests to the backend.
* **Tailwind CSS:** For modern and responsive styling.

### Backend & Infrastructure

* **Application Load Balancer:** To distribute incoming web traffic.
* **EC2 Auto Scaling Group:** For a resilient, scalable fleet of web servers.
* **API Gateway:** To create, manage, and secure our REST API.
* **AWS Lambda:** For serverless compute functions.
* **Amazon S3:** For scalable object storage (original and translated documents).
* **Amazon DynamoDB:** As a NoSQL database for tracking translation job state and metadata.
* **AWS Translate:** The core AI service for performing document translations.
* **IAM (Identity and Access Management):** To ensure secure, least-privilege permissions between services.
* **CloudFormation/Terraform (IaC):** To define and provision all our AWS infrastructure as code.

## 🚀 Getting Started

Instructions on how to deploy the infrastructure and run the project will be added here soon.

## ✍️ Authors

* **Daniel** - [GitHub Profile](https://github.com/SilentDevCoPro)
* **Max** - [GitHub Profile](https://github.com/Daancoria)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
