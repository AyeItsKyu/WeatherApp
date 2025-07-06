FROM nginx:alpine

# remove default nginx index page
RUN rm /usr/share/nginx/html/index.html

# Copy React build files
# COPY build /usr/share/nginx/html
COPY /app/ /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]