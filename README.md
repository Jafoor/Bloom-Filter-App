# Bloom Filter Username Checker

A Node.js application that checks username availability using a Bloom Filter, styled with Tailwind CSS. Users can register with a username and password, and registered usernames are displayed dynamically.

## Features

- **Username Availability Check**: Checks if a username exists using a Bloom Filter.
- **Real-Time Feedback**: Immediate response when typing a username.
- **User Registration**: Register users and update the Bloom Filter.
- **Display Registered Users**: Shows all registered usernames beside the form.
- **Tailwind CSS Styling**: Modern and responsive UI.

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS, Tailwind CSS
- **Bloom Filter**: Custom implementation with MurmurHash3

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/bloom-filter-app.git
   cd bloom-filter-app


# Bloom Filter

A **Bloom Filter** is a space-efficient, probabilistic data structure used to test whether an element is a member of a set. It is highly efficient for large datasets, but it allows false positives (elements that are reported to be in the set but are not). However, it never allows false negatives (if it says an element is not in the set, then it definitely isn't).

## How It Works

A Bloom Filter is implemented using:

1. **Bit Array**: A fixed-size bit array initialized to all 0s.
2. **Hash Functions**: A set of hash functions that map elements to positions in the bit array.

### Steps:

1. **Adding an Element**:
   - The element is hashed using multiple hash functions.
   - Each hash function returns an index in the bit array.
   - The bits at these indices are set to 1.

2. **Checking for an Element**:
   - The element is hashed again using the same hash functions.
   - If all bits at the resulting indices are 1, the element is possibly in the set (a false positive might occur).
   - If any bit is 0, the element is definitely not in the set.

## Example

Consider adding the element "Alice" to a Bloom Filter:

1. Hash "Alice" using multiple hash functions, which generate indices like 2, 5, and 7.
2. Set the bits at these indices in the bit array to 1: 

```
Bit Array: [0, 0, 1, 0, 0, 1, 0, 1, 0, 0]
```


3. To check if "Alice" is in the set, hash "Alice" again, and verify if all the corresponding bits are 1.

## Pros and Cons

### Pros:
- **Space-Efficient**: Uses less memory compared to other data structures like hash tables.
- **Fast Lookups**: Performs membership checks in constant time `O(1)`.

### Cons:
- **False Positives**: May incorrectly report that an element is in the set.
- **No Deletion**: Once an element is added, it cannot be removed from the Bloom Filter.

## Applications

- **Web Caching**: Used to check if content is already in the cache.
- **Databases**: To avoid expensive disk lookups when searching for non-existing keys.
- **Spam Filters**: To quickly identify known spam emails.

## Summary

Bloom Filters are great for use cases where you need fast, memory-efficient lookups and can tolerate some false positives. However, they are unsuitable for cases where precise membership information is required.
