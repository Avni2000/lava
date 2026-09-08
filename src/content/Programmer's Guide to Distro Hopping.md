---
title: Programmer's Guide to Distro Hopping
date: 08-18-2026
---

Between suspend issues on one OS and having to get a new computer, I've been distro hopping a lot. Here's the fastest way I've found you can get your computer set up. It's also just useful for the next time this inevitably happens to me.

Some of the commands here will be Debian/Ubuntu specific, but broadly apply to any modern distro.

## Copying Files over from the last distro

A core idea with Linux is that everything is a file. This means that we can simply "mount" our old file system within our new distro.


**1. Find your old OS partition:**

Run:

`lsblk -f`

and identify the old OS from the size of its partition or some other defining feature (file system type, `LABEL` if set...).

On my machine, this looks something like `nvme0n1p6`.


**2. Create a Mount Point:**

We'll be able to access the old file system at `/mnt/old_os`:

`sudo mkdir -p /mnt/old_os`

Then to mount the partition at that point:

`sudo mount -o ro /dev/nvme0n1p6 /mnt/old_os`

- where `ro` means readonly (you probably don't want to accidentally touch some old stuff while you're doing this!)
- where `dev/nvme0n1p6` is the partition file you found from step 1

Finally, you can run `rsync` to "merge" over your home directory.
```bash
rsync -avh --dry-run /mnt/old_os/home/avni/ /home/avni/
```

The `--dry-run` flag allows us to do a spot check for any directories we're copying over that we might not want. For eg, I use a lot of TypeScript, Python, C++ (with vcpkg and cmake) and Rust. I noticed that I didn't really want to copy over heavy .venvs or folders of dependencies that would be easily regenerable on a clean machine.

After running the above a few times, I came up with the following final rsync command:
```bash
rsync -avh \
  --exclude='node_modules' \
  --exclude='.cache' \
  --exclude='.venv' \
  --exclude='vcpkg' \
  --exclude='target' \
  --exclude='.cargo' \
  --exclude='.local' \
 /mnt/old_os/home/avni/ /home/avni/
```
(I've certainly missed a few things but you get the point)

## Copying Packages

If you're lucky enough to be going from the same package manager to the same package manager, you can run the equivalent of:
```bash
apt-mark showmanual > ~/packages.txt
```
within `mnt/old_os` to get a list of manually installed packages from your `old_os`, then install it on your new OS with:
```bash
xargs -a ~/packages.txt sudo apt install -y --ignore-missing #this also works if some packages are broken
```

I've also found that if you're *not* going from the same package manager to the same package manager, frontier models are really good at knowing equivalent packages—at least for the well known ones, which might be worth considering if you don't want to do it incrementally.

### VS Code extensions (if applicable)

In `mnt/old_os` again, run 
```bash
code --list-extensions > extensions.txt
```
then 
```bash
 cat extensions.txt | xargs -L1 code --install-extension 
```
in the new OS

## Git Setup

I think git is available from the start on most modern distros, but I recently learned that a faster way to set up git credentials is to use `gh`(if you use github)

`gh` is a command-line utility designed to interact with github's API.

`sudo apt install gh`

and subsequently following the steps to login with:

`gh auth login`

sets up your local git creds w/o any kind of special token.


## Unmounting:

Simply run `sudo umount /mnt/old_os`
