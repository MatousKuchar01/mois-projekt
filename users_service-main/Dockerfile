FROM python:3.12
WORKDIR /service

# Install the application dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy in the source code
COPY ./ .
EXPOSE 80

# Setup an app user so the container doesn't run as the root user
RUN useradd app
USER app

CMD ["gunicorn", "-b", "0.0.0.0:80", "run", "--workers", "1", "--threads", "2", "--timeout", "90", "--log-file", "-", "--log-level", "warning"]