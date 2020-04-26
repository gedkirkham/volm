from django.db import models

class Advert(models.Model):
    active
    address
    created
    description
    end_date
    last_modified
    last_modified_by
    organisation
    start_date
    tag_line
    title

class Address(models.Model):
    address_1
    address_2
    address_3
    address_4
    address_5
    address_postcode

class Contact(models.Model):
    address_1
    email_1
    organisation
    phone_1

class Organisation(models.Model):
    active
    banner_image
    created
    charity_id
    short_bio
    long_bio
    tag_line
    last_modified
    logo
    name

class UserProfile(models.Model):
    organiser
    profile_pic
    worker

class Worker(models.Model):
    skills
    availability_day
    availability_time
    travel_mode
    travel_distance
    remote