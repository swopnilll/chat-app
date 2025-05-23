import SearchInput from "@/components/common/SearchInput";

import Header from "@/components/ui/Header";
import UserAvatar from "@/components/ui/UserAvator";
import { auth, createOrUpdateThread } from "@/firebaseConfig";
import { fetchAllUsers } from "@/services/users/usersService";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const groupedContacts = {
  A: [
    {
      id: "1",
      name: "Afrin Sabila",
      status: "Life is beautiful 👌",
      avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: "2",
      name: "Adil Adnan",
      status: "Be your own hero 💪",
      avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: "3",
      name: "Alice Anderson",
      status: "Chasing dreams ✨",
      avatarUrl: "https://randomuser.me/api/portraits/women/11.jpg",
    },
  ],
  B: [
    {
      id: "4",
      name: "Bristy Haque",
      status: "Keep working ✍️",
      avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: "5",
      name: "John Borino",
      status: "Make yourself proud 😍",
      avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: "6",
      name: "Borsha Akther",
      status: "Flowers are beautiful 🌸",
      avatarUrl: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      id: "7",
      name: "Brian Blake",
      status: "Hustle mode on 🚀",
      avatarUrl: "https://randomuser.me/api/portraits/men/6.jpg",
    },
  ],
  C: [
    {
      id: "8",
      name: "Catherine Diaz",
      status: "Coffee then conquer ☕",
      avatarUrl: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      id: "9",
      name: "Chris Pine",
      status: "Focused on growth 🌱",
      avatarUrl: "https://randomuser.me/api/portraits/men/8.jpg",
    },
  ],
  D: [
    {
      id: "10",
      name: "Diana Prince",
      status: "Wondering the world 🦸‍♀️",
      avatarUrl: "https://randomuser.me/api/portraits/women/9.jpg",
    },
    {
      id: "11",
      name: "David Warner",
      status: "Play hard, work harder 🏏",
      avatarUrl: "https://randomuser.me/api/portraits/men/10.jpg",
    },
  ],
  E: [
    {
      id: "12",
      name: "Emma Stone",
      status: "Living the moment 🌈",
      avatarUrl: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      id: "13",
      name: "Ethan Hunt",
      status: "Mission accepted 🔥",
      avatarUrl: "https://randomuser.me/api/portraits/men/13.jpg",
    },
  ],
  F: [
    {
      id: "14",
      name: "Fahim Rahman",
      status: "No pain, no gain 💯",
      avatarUrl: "https://randomuser.me/api/portraits/men/14.jpg",
    },
    {
      id: "15",
      name: "Farah Khan",
      status: "Dance with life 💃",
      avatarUrl: "https://randomuser.me/api/portraits/women/15.jpg",
    },
  ],
};

const groupByFirstLetter = (
  users: Array<{ id: string; name: string; status: string; avatarUrl: string }>
) => {
  return users.reduce((acc, user) => {
    const letter = user.name[0].toUpperCase();

    if (!acc[letter]) acc[letter] = [];

    acc[letter].push(user);

    return acc;
  }, {} as Record<string, typeof users>);
};

const startConversation = async (contactId: string) => {
  const currentUserId = auth.currentUser?.uid;
  if (!currentUserId) return;

  const sortedIds = [currentUserId, contactId].sort();
  const threadId = sortedIds.join("_");

  // Optionally create the thread without a message
  await createOrUpdateThread(currentUserId, contactId);

  // Navigate to conversation
  router.push(`/conversations/${threadId}`);
};

export default function ContactScreen() {
  const [search, setSearch] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  // Static contacts (flattened from groupedContacts)
  const staticContacts = Object.values(groupedContacts).flat();

  // Fetch users once
  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchAllUsers();
      if (data?.users) {
        const mappedUsers = data.users.map((user: any) => ({
          id: user.uid,
          name: user.displayName,
          status: user.email || "Available", // fallback if no status
          avatarUrl: user.photoURL ?? "", // default fallback
        }));
        setAllUsers(mappedUsers);
      }
    };

    getUsers();
  }, []);

  // Combine static + fetched users
  const combinedUsers = [...staticContacts, ...allUsers];

  // Group all users by first letter
  const groupedCombinedContacts = groupByFirstLetter(combinedUsers);

  // Filter based on search input
  const filteredContacts = Object.entries(groupedCombinedContacts).reduce(
    (acc, [letter, contacts]) => {
      const filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase())
      );
      if (filtered.length > 0) {
        acc[letter] = filtered;
      }
      return acc;
    },
    {} as Record<
      string,
      Array<{ id: string; name: string; status: string; avatarUrl: string }>
    >
  );

  return (
    <View style={styles.container}>
      <Header title="Contacts" />

      <SearchInput
        value={search}
        onChangeText={setSearch}
        onClear={() => setSearch("")}
      />

      <ScrollView style={styles.scrollArea}>
        {Object.entries(filteredContacts).map(([letter, contacts]) => (
          <View key={letter}>
            <Text style={styles.sectionHeader}>{letter}</Text>
            {contacts.map(({ id, name, status, avatarUrl }) => (
              <TouchableOpacity
                key={id}
                style={styles.contactItem}
                onPress={() => startConversation(id)}
              >
                <UserAvatar size={60} imageUrl={avatarUrl} name={name} />
                <View style={styles.info}>
                  <Text style={styles.name}>{name}</Text>
                  <Text style={styles.status}>{status}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollArea: {
    flex: 1,
    marginBottom: 70,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 12,
    color: "#000",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  status: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
});
