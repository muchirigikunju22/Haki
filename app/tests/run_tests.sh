#!/bin/bash
OUTPUT_FILE="haki_results_$(date +%Y%m%d_%H%M%S).json"
API_URL="https://web-production-6590e.up.railway.app"

echo "[]" > $OUTPUT_FILE

run_test() {
  ID=$1
  CATEGORY=$2
  SCENARIO=$3

  echo "Testing $ID: $CATEGORY..."

  RESPONSE=$(curl -s -X POST "$API_URL/ask" \
    -H "Content-Type: application/json" \
    -d "{\"scenario\": \"$SCENARIO\", \"language\": \"english\"}")

  # Append to results file
  python3 -c "
import json, sys
results = json.load(open('$OUTPUT_FILE'))
results.append({
  'id': $ID,
  'category': '$CATEGORY',
  'scenario': '''$SCENARIO''',
  'response': $RESPONSE
})
json.dump(results, open('$OUTPUT_FILE','w'), indent=2, ensure_ascii=False)
print('  Saved.')
"
  sleep 2
}

# 1 — Roadblock bribery
run_test 1 "Roadblock & Bribery" "I was driving home at 11pm on Thika Road when police stopped me at a roadblock with no visible signs or lights. Three officers approached my car and one said my insurance was expired even though it is valid until next year and I showed him the document. He demanded 3000 shillings cash or he would have my car towed. When I asked for his badge number he covered it with his hand. What are my rights and what should I do?"

# 2 — Roadblock, phone confiscated
run_test 2 "Roadblock & Bribery" "A police officer stopped me on Mombasa Road and demanded 1000 shillings saying I was driving without a seatbelt which is not true. When I refused to pay and said I would record the interaction he grabbed my phone through the window and refused to return it. He said I had no right to record police officers. Is this true and how do I get my phone back?"

# 3 — Unlawful arrest, no reason given
run_test 3 "Unlawful Arrest" "I was arrested outside my workplace in Industrial Area Nairobi on a Tuesday afternoon. The officers did not tell me why I was being arrested or show any warrant. They put me in a police vehicle and took me to Makadara police station. At the station they refused to tell me what I was being charged with and put me in a cell. I have been here for 18 hours and still have not been told anything. What are my rights?"

# 4 — Family cannot find arrested person
run_test 4 "Unlawful Arrest" "My brother was arrested three days ago in Mathare and we cannot find him. We have been to four different police stations and they all say he is not there. One officer told us to stop asking questions or we would also be arrested. My brother has not been allowed to call us and we do not know if he has a lawyer. What law has been broken and what can we do to find him and get him released?"

# 5 — Detained beyond 24 hours
run_test 5 "Unlawful Detention" "I was arrested on Friday night and it is now Sunday afternoon. I have been in a cell at Lang'ata police station for almost 48 hours and I have not been taken to court or told when I will be taken. I asked the duty officer about my right to appear before a court and he said courts are closed on weekends and I have to wait until Monday. Is it legal for police to keep me this long without taking me to court?"

# 6 — Denied bail
run_test 6 "Bail Rights" "I was arrested and charged with causing disturbance. When I appeared before the magistrate he set bail at 80000 shillings which I cannot afford. I have lived in this area my whole life, I have a job and a family, and I have never been in any trouble before. The magistrate did not explain why such a high amount was set. My husband is now in remand prison with convicted criminals. What factors should be considered for bail and how do we apply for a bail review?"

# 7 — Police brutality during arrest
run_test 7 "Police Brutality" "I was walking home from work at 7pm in Westlands when two police officers stopped me and asked for my ID. I gave it to them immediately. One officer said I looked like a suspect and told me to get in their vehicle. When I asked if I was being arrested and what I was charged with the officer twisted my arm and pushed me to the ground. I have a swollen wrist and a cut on my head. They held me for eight hours then released me with no charge. What offences did they commit and how do I report this?"

# 8 — Beaten in custody
run_test 8 "Police Brutality" "I was arrested last week and while I was in the holding cell at the station two officers came in and beat me with batons saying I was being disrespectful. I have bruises on my back and arms. When I asked to see a doctor they refused and said I should have behaved. I was released the next day without any charge. I am now scared to report this because I fear they will arrest me again. What are my legal options and how do I safely report what happened?"

# 9 — Home searched without warrant
run_test 9 "Unlawful Search" "Police came to my house in Ruiru at 9pm and said they had a tip that I was hiding stolen goods. I asked to see their search warrant and they said they did not need one because it was an emergency. They pushed into the house and searched every room for two hours. They took my laptop, a television and 20000 shillings saying they were evidence. They gave me no receipt. When I went to the station the next day they said they had no record of my property. What are my rights and how do I recover my belongings?"

# 10 — Car searched without permission
run_test 10 "Unlawful Search" "A police officer stopped my car near Gigiri and asked me to open the boot. I asked why and he said he did not need to give a reason. He searched my entire car including under the seats and in my bags without asking permission. He found nothing but then said I owed him something for his time. Under what circumstances can police search a vehicle in Kenya and what should I have done?"

# 11 — Denied access to lawyer
run_test 11 "Right to a Lawyer" "I have been in police custody at Central Police Station Nairobi for two days. My family sent a lawyer to represent me but the officers at the gate have turned him away twice saying I am not allowed visitors. The lawyer has a letter from our family authorising him to represent me. I have also been asking to make a phone call since I was arrested and they keep refusing. What are my rights regarding access to a lawyer in Kenya?"

# 12 — Recording police
run_test 12 "Recording Police" "I witnessed three police officers beating a man on the ground outside a shop in Ngara. The man was not resisting. I started recording on my phone. One officer saw me and came over, took my phone and arrested me saying I was interfering with police operations. They held me for five hours and deleted my videos before releasing me. Was my arrest lawful, do I have the right to record police in public, and how do I report what I saw?"

# 13 — Minor arrested with adults
run_test 13 "Arrest of a Minor" "My 15 year old daughter was arrested yesterday after school near our home in Kawangware. The police say she was with a group of young people who were suspected of theft but she was not involved and had nothing on her. She has been held overnight in a cell with adult women. I went to the station and they would not let me see her. She has not had access to a lawyer and I am not sure if she has eaten. What special rights do minors have under Kenyan law when arrested?"

# 14 — Traffic fine scam
run_test 14 "Traffic Offences" "A traffic police officer stopped me on Ngong Road and said I had jumped a red light. I did not jump any light but I could not argue. He wrote 10000 shillings on a piece of paper and told me to pay cash immediately or he would take my driving licence. He said if I went to court I would pay even more. I paid but now I want to know if what he did was legal and whether I can get my money back or report him."

# 15 — Inhumane cell conditions
run_test 15 "Detention Conditions" "I spent three days in a holding cell at Kamukunji police station. There were over 20 people in a cell meant for maybe 5. There was no water, no food given for the first two days, the toilet was a bucket that was only emptied once, and there was no space to lie down. Two people in the cell were sick and no medical attention was provided. I was released without charge. What laws were violated regarding detention conditions in Kenya and how do I report this?"

# 16 — False accusation by neighbour
run_test 16 "False Accusation" "My neighbour has a long running dispute with me over the boundary of our land. Last month he went to the police and told them I had threatened to kill him. This is completely false. I was at work when the alleged threat was made and I have colleagues who can confirm this. The police arrested me without investigating and I was held for two days. The case is still pending even though there is no evidence. What are my rights when falsely accused and how do I get the case dismissed?"

# 17 — Plainclothes officers, no ID shown
run_test 17 "Suspicious Police" "Three men in civilian clothes came to my shop in Gikomba and said they were police officers investigating counterfeit goods. They did not show any badges or identification. When I asked for ID one of them grabbed me by the shirt. They searched my entire shop without a warrant and took several items including my phone and cash register. They gave me a handwritten receipt but no official documents. How do I verify if someone is a real police officer and what should I do in this situation?"

# 18 — Arrested for asking questions
run_test 18 "Unlawful Arrest" "I went to Kilimani police station to ask about my friend who had been arrested. I was asking the officer at the desk for information about my friend when he suddenly told me I was being arrested for obstruction. I had not raised my voice or caused any disturbance. I was locked up for six hours before being released. Was my arrest lawful and what recourse do I have for being wrongfully detained?"

# 19 — Excessive force at protest
run_test 19 "Police Brutality" "I was attending a peaceful demonstration in Nairobi CBD last week. The police arrived and fired tear gas into the crowd. When I was running away an officer hit me on the legs with a baton even though I was clearly trying to leave. I fell and was stepped on by other people running. I have a fractured ankle and I was taken to hospital. Is the use of force by police at demonstrations regulated by Kenyan law and what can I do?"

# 20 — Arrested for debt
run_test 20 "Unlawful Arrest" "My landlord went to the police and told them I had stolen from him. The reason is that I owe him two months rent. The police came and arrested me for theft even though owing rent is a civil matter not a criminal one. I was kept for a day before a lawyer told the police this was a civil dispute and they released me. Can someone be arrested for owing money and what can I do about this wrongful arrest?"

# 21 — Police demand to unlock phone
run_test 21 "Rights During Arrest" "I was arrested last week on suspicion of fraud. At the station the investigating officer demanded I unlock my phone and give him my passwords. I refused and he said if I did not cooperate he would charge me with additional offences. He also threatened to hold me for 14 days if I did not comply. Am I legally required to give police access to my phone and what are my rights regarding self-incrimination in Kenya?"

# 22 — Held for weeks without charge
run_test 22 "Unlawful Detention" "My uncle was arrested 21 days ago and has still not been taken to court or formally charged. Every time we go to the station they say the investigation is ongoing and he cannot be released. He has been denied bail and has only seen a lawyer once. We have been told it could be weeks more before he appears in court. What does Kenyan law say about the maximum time a person can be held without being charged or taken to court?"

# 23 — Threatened for filing complaint
run_test 23 "IPOA Complaint" "Two weeks ago I filed a complaint with IPOA about police officers who assaulted me during an arrest. Yesterday the same officers came to my house and warned me that if I did not withdraw my complaint they would make my life difficult and find reasons to arrest me. I am now scared to continue with the complaint. Is witness intimidation by police a crime in Kenya and how do I protect myself while pursuing my complaint?"

# 24 — Arrested for online post
run_test 24 "Unlawful Arrest" "I posted on Facebook criticising the local police commander for allowing corruption at roadblocks in our area. Two days later police came to my house and arrested me saying I had made defamatory statements against a government officer. I was held for a day and then released. They told me I could be charged under the Computer Misuse and Cybercrimes Act. Do I have the right to criticise police conduct online and was my arrest lawful?"

# 25 — Out of scope test
run_test 25 "Out of Scope" "My employer fired me without notice after I reported unsafe working conditions to the government. I believe this is victimisation and I want to take legal action. I have worked there for six years and I have never had a disciplinary issue. What are my rights as an employee and how do I challenge this dismissal?"

echo ""
echo "Done. Results saved to: $OUTPUT_FILE"
echo "Load this file into the Haki review interface."