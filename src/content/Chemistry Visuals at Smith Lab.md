---
title: Chemistry Visuals at Smith Lab
date: 06-25-2026
---

# Chemistry Visuals at Smith Lab

I worked on a wide variety of stuff, but a few of my favorite mini-projects were creating [manim](https://www.manim.community/) visualizations of ways to embed [mass spectra](https://en.wikipedia.org/wiki/Mass_spectrometry) for use in Machine Learning models.

You can find all of my work on the [lab's github repo](https://github.com/smith-chem-wisc/MS_Spectral_Encoding/)

To put it simply, how do we go from:

<img src="/ms2-spectrum-ex.png" alt="Mass Spectrum Example" />


to a list of numbers? The spectrum above is human readable, but the machine learning model still needs a numerical representation.



## Method 1: Fast Database Search

The main goal of comptational proteomics (study of proteins) is to identify proteins from some kind of data. Usually, that data is a mass spectrum, which plots the intensity of each peak (akin to a current) across a range of masses.

We usually have some database that people have hand-created which says "this mass spectrum corresponds to peptide X" (a peptide is a small part of a protein).

Then, we're interested in figuring out ways to quickly search a massive database of *annotated* spectra for proteins. 


### Clustering

It is kind of like sorting legos. We do some preprocessing to make it easier to build the lego later.

![Lego Clustering](/lego-clustering.png)

We take all the labeled spectra in our database and sort them into groups of similar ones. 

Once that's done, whenever a new, unidentified spectrum comes in, we just check which group it looks most like, instead of comparing it against every single spectrum in the database one by one.

But in order to cluster spectra, we need some way to compare them. This is typically done via a binning strategy. One strategy is to bin the mass spectrum into a fixed number of bins, with each bin representing a different mass range. 

<video controls poster="/Screenshot from Binning.mp4.png">
  <source src="/binning.mp4" type="video/mp4">
</video>

Where our resulting vector for each spectrum is dense with a bunch of zeros.

Empirically, we found that at a bin size of 0.04 Da, we get decent clustering results, but this takes 50,000 bins to cover the full mass range (0-2000 Da).

**What if we could make this more space efficient?** There are so many bins that are empty (zeros) that it seems like we may use some other compression schema

### Hashing 

It turns out that we can use deterministic randomness to compress the binning vectors even further. That is, we can use a hash function to map each bin to a small, fixed-size integer, and then use that integer to represent the bin in the vector.

This allows us to represent each spectrum as a sparse vector, with only a few non-zero entries, greatly reducing the memory footprint of storing and dotting against different spectra in the database.

Here's what that looks like, with a toy representation of a hashed vs. unhashed binned vector:

<video controls poster="/Screenshot from hashing-preservation-complete.mp4.png">
  <source src="/hashing-preservation-complete.mp4" type="video/mp4">
</video>


---


## Method 2: Sinusoidal Encoding


The field of proteomics largely takes from traditional NLP concepts here. Specifically, the [sinusoidal encoding](https://en.wikipedia.org/wiki/Transformer_(deep_learning)#Positional_encoding) is used to represent the mass spectrum as a sequence of numbers.

![Sinusoidal Encoding in the context of the transformer architecture](/sinusoidal-pe-transformers.png)


The idea here is that we need some way to represent peaks in our data with regard to their position. **That is, "The dog bites the man" is different from "The man bites the dog"**. Somehow, we'd like to encode each word with its position in the sequence.

"Imbuing" this knowledge is actually not as trivial as it sounds.

---

### Attempt 1: Just use the number

If you look at the type of data on the histogram above, we see that the x-axis are already monotonically increasing.

So why are we trying to overcomplicate this? Just give a model the peak at $m/z = 600$ for example.

The drawback to this is that we lose the idea that we can "attend" to different peaks. If we're using a transformer model, we know that it simply uses the inner product of vectors to compute which peaks are "similar" to each other.

And dotting 2 random peaks at $600 \cdot 100$ for example, won't result in a useful answer. 

*In fact, this is a property of most machine learning models; they can't do subtraction out of the box.* 

They "learn" via matrix multiplication and division. So we'd lose the idea that $600$ is $\sim 500 \, m/z$ away from 100, because that's simply not a property of our model.

---

### Attempt 2: Binary

Okay, so raw numbers won't work. What about binary? The peak at $m/z = 8$ would be represented as `1000`:

| $m/z$ | Binary |
|-----|--------|
| 1 | `0001` |
| 2 | `0010` |
| 4 | `0100` |
| 8 | `1000` |

This means that the last bit flips every $1 m/z$, the next bit flips every $2 m/z$, the next every $4 m/z$, and so on. This allows us to try and capture the idea of "close" and "far" peaks. For example, $m/z = 6$ (`0110`) and $m/z = 7$ (`0111`) are neighbors.

This is way more compact! We only need about 11 bits to represent $m/z$ up to 2000. But binary has its own problem: $m/z = 7$ (`0111`) and $m/z = 8$ (`1000`) are *neighbors*, yet their binary representations differ in **every single bit**. The model has no sense of "closeness" because 7 and 8 look as different as 7 and 1000. Again, it cannot add or subtract as we can.

---

### What if we could smooth binary out?

Notice that binary digits flip between 0 and 1 at different rates: the rightmost bit flips every step, the next bit every 2 steps, the next every 4, and so on. What if instead of hard 0/1 flips, we used smooth, continuous oscillations at these different frequencies?

Most machine learning models rely on continuity between positions in order to "train their weights" with calculus. If we can create a representation where nearby $m/z$ values have similar representations, the model can learn to attend to those relationships. 

That's exactly what **sinusoidal positional encoding** does.

---

We can essentially use a somewhat arbitrary formula to draw sine waves through our peak a number of times, and use the resulting waveform as a representation of the peak's position.
- Short wavelengths detect tiny $m/z$ position changes (eg. between $600$ and $601$), while long wavelengths detect larger changes (eg. between $600$ and $700$s).

<video controls poster="/Screenshot from sinusoidal-pe.mp4.png">
  <source src="/sinusoidal-pe.mp4" type="video/mp4">
</video>

We can run this algorithm for every peak, and use the set of resulting waveforms to represent the distribution of peaks in our dataset, allowing us to analyze the data using traditional machine learning techniques.
