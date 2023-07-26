## ImagineAI

![image](https://github.com/samsonsim2/storybook-frontend/assets/106437135/f52ed2d1-d3b6-477b-b8c4-2c1d91990331)



Full-stack web app for children to explore their creativity using AI. Users can generate fully illustrated storybooks, write stories with the help of AI-generated prompts, and turn sketches into masterpieces with the click of a button. 

## Features
 

* **Customisable AI generated stories:** Create an unlimited number of fully illustrated stories. User gives a brief description of the story they want to write, the characters and setting. User can also specify the genre of the story, the intended age of the target audience ( toddlers or pre-teens), and the length/no. of pages of their story.  

 ![CreateStory](https://github.com/samsonsim2/storybook-frontend/assets/106437135/da4cfc67-1a74-4b78-9e5e-29d674ee47be)


* **Collaborative stories:** User can write stories with friends. A collaborative story generates a random writing prompt for users and 10 guiding questions for them to complete the story. Collaborative stories can be shared with other users so they can contribute to the story writing. Users can also generate a cover for their story and accompanying images from the paragraphs they've written.

#1 Creating a collaborative story: 

![CollaborativeStory](https://github.com/samsonsim2/storybook-frontend/assets/106437135/08597465-96f9-4d22-adfe-1012bf311653)

#2 Sharing a collaborative story: 

Users can share collaborative stories with other users through their email address
![image](https://github.com/samsonsim2/storybook-frontend/assets/106437135/a066f707-5f5e-44f6-9400-22ca52723212)

Collaborators can only edit stories, while the creators can edit + delete + share 
![image](https://github.com/samsonsim2/storybook-frontend/assets/106437135/c7822b8a-835a-4386-ab0a-ff8879522812)

#3 Collaboration gallery: 
All collaborations can be seen in the collaboration gallery which will display them as non-editable stories with a page-by-page view 

![image](https://github.com/samsonsim2/storybook-frontend/assets/106437135/eb6e3e17-e351-4aca-a3ea-8d17511811a9)
![image](https://github.com/samsonsim2/storybook-frontend/assets/106437135/a9a201b0-f29a-4762-b4ce-21f4e154c40d)


 


* **Sketch to image:** Users can generate art from their sketches and through simple prompting of the subject matter/ style. Images can be saved to an image gallery and downloaded by the user 
  ![SketchToImage](https://github.com/samsonsim2/storybook-frontend/assets/106437135/0ba91227-c18e-42e0-8d22-a1490590b20a)

  
* **Story Gallery:**  Multi-parameter search query, user can filter stories by search, age group, and genre. Pagination is handled on the server side
  ![StoryGallery_Resized](https://github.com/samsonsim2/storybook-frontend/assets/106437135/90ac9b0a-75ef-45f8-8f9b-91c56e811601)

* **Author Gallery:**  Users can view other users' gallery and see the stories they have written, collaborations, illustrations, and likes

![AuthorGallery_Resized](https://github.com/samsonsim2/storybook-frontend/assets/106437135/18fd8305-5b6d-4fc8-9bb3-35f12a96ffc8)

User can also update their profile info: 
![image](https://github.com/samsonsim2/storybook-frontend/assets/106437135/66b36d4e-8b21-4fc4-9647-f4a989c93f48)

 **User Likes and comments:** Users can like a story and save it in their gallery 

1 # User likes story in community gallery
![image](https://github.com/samsonsim2/storybook-frontend/assets/106437135/db993ee5-bd6c-422a-86c4-bd31b4bd2497)

2# Likes are saved in their own like gallery for future reference
![image](https://github.com/samsonsim2/storybook-frontend/assets/106437135/75a9a866-ffbf-455c-8e38-4678ab9b4503)

3# Users can leave comments on stories. Users are only allowed to edit and delete their own comments 

![image](https://github.com/samsonsim2/storybook-frontend/assets/106437135/b8da28eb-91f0-4839-a348-945fc0333ef2)
![image](https://github.com/samsonsim2/storybook-frontend/assets/106437135/bf6b70f4-bcb8-447e-b0b0-6749c6231d83)


 

 
## Tech Stack: 
* Front end: React, ReactCanvas, html5Canvas
* UI: Material UI
* Generative AI: LangChain, OpenAI, Replicate 
* Storage: Firebase
* Backend: Node, Express, Sequelize
* Database: PostgreSQL
* Authorization: Auth0

## Future Improvements
* Better prompt engineering 
* Create stories in different languages 
* Context persistence for image generation  

## Contributors 
* Samson Sim

