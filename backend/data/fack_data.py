from faker import Faker
import random
import mongoengine
from models.user import User
from models.video import Video
from models.follow import Follow
from models.comment import Comment
from models.like import Like
from models.bookmark import Bookmark

# Connect to MongoDB (adjust the connection string as needed)
mongoengine.connect("qesa")

fake = Faker()

video_urls = [
    (
        "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540alidrisy%252FQesa/ImagePicker/5c5537e5-a194-41bd-8b71-ae6463a299df.mp4",
        "https://img.youtube.com/vi/3JZ_D3ELwOQ/maxresdefault.jpg",
    ),
    (
        "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540alidrisy%252FQesa/ImagePicker/99421022-5fa1-412d-8a84-1b90040e5f10.mp4",
        "https://img.youtube.com/vi/VYOjWnS4cMY/maxresdefault.jpg",
    ),
    (
        "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540alidrisy%252FQesa/ImagePicker/58b490de-d55b-4835-8b5d-7079e309258a.mp4",
        "https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg",
    ),
    (
        "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540alidrisy%252FQesa/ImagePicker/f5a3015d-dbd9-4d6c-85e2-5117e9dc4b9c.mp4",
        "https://img.youtube.com/vi/Zi_XLOBDo_Y/maxresdefault.jpg",
    ),
    (
        "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540alidrisy%252FQesa/ImagePicker/bae7f4e6-367a-42a9-acfd-7c2028a36ef2.mp4",
        "https://img.youtube.com/vi/hT_nvWreIhg/maxresdefault.jpg",
    ),
    # Add more video URLs and thumbnails as needed
]

profile_pictures = [
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
    "https://randomuser.me/api/portraits/women/3.jpg",
    "https://randomuser.me/api/portraits/men/4.jpg",
    "https://randomuser.me/api/portraits/women/4.jpg",
    "https://randomuser.me/api/portraits/men/5.jpg",
    "https://randomuser.me/api/portraits/women/5.jpg",
    # Add more profile picture URLs as needed
]


# Generate fake users
def create_fake_user():
    user = User(
        email=fake.unique.email(),
        username=fake.unique.user_name(),
        password=fake.password(),
        first_name=fake.first_name(),
        last_name=fake.last_name(),
        birth_date=fake.date_of_birth(minimum_age=18, maximum_age=90),
        profile_picture=random.choice(profile_pictures),
        bio=fake.text(max_nb_chars=200),
        followers=random.randint(0, 10000),
        following=random.randint(0, 10000),
        is_validated=random.choice([True, False]),
    )
    user.save()
    return user


# Generate fake videos
def create_fake_video(creator):
    video_url, thumbnail_url = random.choice(video_urls)
    video = Video(
        video_url=video_url,
        thumbnail_url=thumbnail_url,
        description=fake.text(max_nb_chars=200),
        creator=creator,
        user_id=str(creator.id),
        tags=[fake.word() for _ in range(random.randint(1, 5))],
        likes=random.randint(0, 10000),
        bookmarks=random.randint(0, 10000),
        shares=random.randint(0, 10000),
        views=random.randint(0, 100000),
        comments=random.randint(0, 1000),
    )
    video.save()
    return video


# Generate fake follow relationships
def create_fake_follow(follower, following):
    follow = Follow(
        follower=follower,
        following=following,
    )
    follow.save()
    return follow


# Generate fake comments
def create_fake_comment(creator, video):
    comment = Comment(
        text=fake.text(max_nb_chars=200),
        creator=creator,
        video_id=video.id,
    )
    comment.save()
    return comment


# Generate fake likes
def create_fake_like(user, video):
    like = Like(
        user_id=user.id,
        video_id=video.id,
    )
    like.save()
    return like


# Generate fake bookmarks
def create_fake_bookmark(user, video):
    bookmark = Bookmark(
        user_id=user.id,
        video_id=video.id,
    )
    bookmark.save()
    return bookmark


# Create and save fake data
for _ in range(10):
    user = create_fake_user()
    for _ in range(random.randint(1, 5)):  # Each user can have multiple videos
        video = create_fake_video(user)
        create_fake_comment(user, video)
        create_fake_like(user, video)
        create_fake_bookmark(user, video)

    # Create follow relationships
    for _ in range(random.randint(0, 5)):
        following_user = create_fake_user()
        create_fake_follow(user, following_user)

print(
    "Fake users, videos, comments, likes, bookmarks, and follow relationships generated and saved to the database."
)
